package com.btp.controle.service;

import com.btp.controle.config.RabbitMQConfig;
import com.btp.controle.dto.*;
import com.btp.controle.event.BtpEvent;
import com.btp.controle.exception.ResourceNotFoundException;
import com.btp.controle.model.*;
import com.btp.controle.repository.ControleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

@Service
@RequiredArgsConstructor
@Slf4j
public class ControleService {

    private final ControleRepository controleRepository;
    private final RabbitTemplate rabbitTemplate;
    private final RestTemplate restTemplate;

    @Value("${plan-service.url:http://PLAN-SERVICE}")
    private String planServiceUrl;

    // Compteur pour générer des références uniques
    private final AtomicLong refCounter = new AtomicLong(0);

    public ControleDto create(CreateControleRequest request, String userId) {
        String controleurId = request.getControleurId() != null ? request.getControleurId() : userId;
        String reference = request.getReference() != null && !request.getReference().isBlank()
                ? request.getReference()
                : generateReference();

        Controle controle = Controle.builder()
                .reference(reference)
                .planId(request.getPlanId())
                .versionId(request.getVersionId())
                .indiceExterneImpacte(request.getIndiceExterneImpacte())
                .typeControle(request.getTypeControle())
                .controleurId(controleurId)
                .projeteurId(request.getProjeteurId())
                .decision(Decision.EN_ATTENTE)
                .build();

        Controle saved = controleRepository.save(controle);

        // Mettre à jour le statut du plan pour indiquer qu'il est en cours de contrôle
        String statutControle = mapTypeControleToStatutPlan(request.getTypeControle());
        if (statutControle != null) {
            updatePlanStatut(saved.getPlanId(), statutControle);
        }

        // Notifier le projeteur qu'un contrôle a été ouvert sur son plan
        if (request.getProjeteurId() != null && !request.getProjeteurId().isBlank()) {
            BtpEvent event = BtpEvent.builder()
                    .routingKey("controle.ajoute")
                    .entiteId(saved.getPlanId())
                    .entiteType("PLAN")
                    .userId(userId)
                    .destinataireId(request.getProjeteurId())
                    .message("Un contrôle (" + request.getTypeControle() + ") a été ouvert sur votre plan")
                    .timestamp(LocalDateTime.now())
                    .build();
            rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE, "controle.ajoute", event);
        }

        log.info("Contrôle créé : {} ({}) pour le plan {}", saved.getId(), request.getTypeControle(), request.getPlanId());
        return toDto(saved);
    }

    public Page<ControleDto> findByPlan(String planId, Pageable pageable) {
        return controleRepository.findByPlanId(planId, pageable).map(this::toDto);
    }

    public ControleDto findById(String id) {
        return toDto(getOrThrow(id));
    }

    public List<ControleDto> findEnAttente(String controleurId) {
        return controleRepository.findByControleurIdAndDecision(controleurId, Decision.EN_ATTENTE)
                .stream().map(this::toDto).toList();
    }

    public List<ControleDto> findMes(String controleurId) {
        return controleRepository.findByControleurIdOrderByDateControleDesc(controleurId)
                .stream().map(this::toDto).toList();
    }

    /**
     * Applique un avis (VSO / VAC / VAO) au contrôle.
     *
     * Règles métier :
     * - Un contrôle déjà décidé est définitif
     * - VAO : remarque obligatoire
     * - VISA + VSO/VAC → plan.etat = VISE_BPE, plan.statut = VISE
     * - VISA + VAO → plan.statut = BROUILLON (corrections nécessaires)
     * - Autres types + VSO/VAC → plan.statut = EMIS (prêt pour la prochaine étape)
     * - Autres types + VAO → plan.statut = BROUILLON
     */
    public ControleDto applyDecision(String id, DecisionRequest request, String userId) {
        Controle controle = getOrThrow(id);

        if (controle.getDecision() != Decision.EN_ATTENTE) {
            throw new IllegalStateException("Ce contrôle a déjà un avis définitif");
        }

        // VAO : remarque obligatoire
        if (request.getDecision() == Decision.VAO
                && (request.getRemarque() == null || request.getRemarque().isBlank())) {
            throw new IllegalArgumentException("La remarque est obligatoire pour un avis VAO");
        }

        controle.setDecision(request.getDecision());
        controle.setRemarque(request.getRemarque());
        if (request.getFichierPDF() != null) {
            controle.setFichierPDF(request.getFichierPDF());
        }
        Controle saved = controleRepository.save(controle);

        // Mettre à jour le statut/état du plan
        applyPlanChanges(saved);

        // Publier l'événement RabbitMQ
        String routingKey = getRoutingKey(request.getDecision());
        String message = buildAvisMessage(request.getDecision(), saved.getTypeControle(), saved.getPlanId());
        BtpEvent event = BtpEvent.builder()
                .routingKey(routingKey)
                .entiteId(saved.getPlanId())
                .entiteType("PLAN")
                .userId(userId)
                .destinataireId(saved.getProjeteurId())
                .message(message)
                .timestamp(LocalDateTime.now())
                .build();
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE, routingKey, event);
        log.info("Avis {} publié pour le contrôle {} (type: {})", request.getDecision(), id, saved.getTypeControle());

        return toDto(saved);
    }

    public ControleDto addCommentaire(String id, CommentaireRequest request, String userId) {
        Controle controle = getOrThrow(id);
        controle.getCommentaires().add(Commentaire.builder()
                .auteurId(userId)
                .contenu(request.getContenu())
                .date(LocalDateTime.now())
                .build());
        return toDto(controleRepository.save(controle));
    }

    /* ── Helpers métier ──────────────────────────────────────────────── */

    /** Met à jour le plan selon l'avis et le type de contrôle. */
    private void applyPlanChanges(Controle controle) {
        boolean isVisa = controle.getTypeControle() == TypeControle.VISA;
        Decision avis = controle.getDecision();

        if (isVisa && (avis == Decision.VSO || avis == Decision.VAC)) {
            // Visa accordé → plan visé BPE
            updatePlanStatut(controle.getPlanId(), "VISE");
            updatePlanEtat(controle.getPlanId(), "VISE_BPE");
        } else if (avis == Decision.VAO) {
            // Observation → retour au projeteur
            updatePlanStatut(controle.getPlanId(), "BROUILLON");
        } else if (avis == Decision.VSO || avis == Decision.VAC) {
            // Contrôle approuvé (non-visa) → avancer vers l'étape suivante
            String nextStatut = switch (controle.getTypeControle()) {
                case CONTROLE_INTERNE   -> "EN_CONTROLE_EXTERNE";
                case CONTROLE_EXTERNE   -> "EN_CONTROLE_TECHNIQUE";
                case CONTROLE_TECHNIQUE -> "VISE";
                default                 -> "EMIS";
            };
            updatePlanStatut(controle.getPlanId(), nextStatut);
            if (controle.getTypeControle() == TypeControle.CONTROLE_TECHNIQUE) {
                updatePlanEtat(controle.getPlanId(), "VISE_BPE");
            }
        }
    }

    /** Routing key RabbitMQ selon l'avis. */
    private String getRoutingKey(Decision decision) {
        return switch (decision) {
            case VSO, VAC -> "controle.valide";
            case VAO      -> "controle.modification";
            default       -> "controle.info";
        };
    }

    private String buildAvisMessage(Decision decision, TypeControle type, String planId) {
        return switch (decision) {
            case VSO -> "Contrôle " + type + " — VSO (Visa Sans Observation) pour le plan " + planId;
            case VAC -> "Contrôle " + type + " — VAC (Visa Avec Commentaire) pour le plan " + planId;
            case VAO -> "Contrôle " + type + " — VAO (Visa Avec Observation) — corrections requises pour le plan " + planId;
            default  -> "Avis " + decision + " pour le plan " + planId;
        };
    }

    /** Mappe le type de contrôle au statut plan correspondant (ouverture du contrôle). */
    private String mapTypeControleToStatutPlan(TypeControle type) {
        return switch (type) {
            case CONTROLE_INTERNE    -> "EN_CONTROLE_INTERNE";
            case CONTROLE_EXTERNE    -> "EN_CONTROLE_EXTERNE";
            case CONTROLE_TECHNIQUE  -> "EN_CONTROLE_TECHNIQUE";
            case VISA                -> null; // Le visa ne change pas le statut à l'ouverture
        };
    }

    /** Appelle Plan Service pour mettre à jour le statut du plan. */
    private void updatePlanStatut(String planId, String statut) {
        try {
            Map<String, String> body = new HashMap<>();
            body.put("statut", statut);
            String url = planServiceUrl + "/api/plans/" + planId + "/statut";
            ResponseEntity<Void> response = restTemplate.postForEntity(url, body, Void.class);
            log.info("Statut du plan {} → {} (HTTP {})", planId, statut, response.getStatusCode());
        } catch (Exception e) {
            log.error("Erreur mise à jour statut plan {} → {}: {}", planId, statut, e.getMessage());
        }
    }

    /** Appelle Plan Service pour mettre à jour l'état du plan (NON_COMMENCE / EN_COURS / VISE_BPE). */
    private void updatePlanEtat(String planId, String etat) {
        try {
            Map<String, String> body = new HashMap<>();
            body.put("etat", etat);
            String url = planServiceUrl + "/api/plans/" + planId + "/etat";
            ResponseEntity<Void> response = restTemplate.postForEntity(url, body, Void.class);
            log.info("État du plan {} → {} (HTTP {})", planId, etat, response.getStatusCode());
        } catch (Exception e) {
            log.error("Erreur mise à jour état plan {} → {}: {}", planId, etat, e.getMessage());
        }
    }

    private String generateReference() {
        long count = controleRepository.count() + refCounter.incrementAndGet();
        return String.format("CTRL-%04d", count);
    }

    /* ── Private helpers ─────────────────────────────────────────── */

    private Controle getOrThrow(String id) {
        return controleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contrôle non trouvé : " + id));
    }

    public ControleDto toDto(Controle c) {
        return ControleDto.builder()
                .id(c.getId())
                .reference(c.getReference())
                .planId(c.getPlanId())
                .versionId(c.getVersionId())
                .indiceExterneImpacte(c.getIndiceExterneImpacte())
                .typeControle(c.getTypeControle())
                .controleurId(c.getControleurId())
                .projeteurId(c.getProjeteurId())
                .dateControle(c.getDateControle())
                .decision(c.getDecision())
                .remarque(c.getRemarque())
                .fichierPDF(c.getFichierPDF())
                .commentaires(c.getCommentaires())
                .build();
    }
}
