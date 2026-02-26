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

@Service
@RequiredArgsConstructor
@Slf4j
public class ControleService {

    private final ControleRepository controleRepository;
    private final RabbitTemplate rabbitTemplate;
    private final RestTemplate restTemplate;

    @Value("${plan-service.url:http://PLAN-SERVICE}")
    private String planServiceUrl;

    public ControleDto create(CreateControleRequest request, String userId) {
        String controleurId = request.getControleurId() != null ? request.getControleurId() : userId;

        Controle controle = Controle.builder()
                .planId(request.getPlanId())
                .versionId(request.getVersionId())
                .typeControle(request.getTypeControle())
                .controleurId(controleurId)
                .decision(Decision.EN_ATTENTE)
                .build();

        Controle saved = controleRepository.save(controle);
        log.info("Contrôle créé : {} pour le plan {}", saved.getId(), request.getPlanId());
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

    /**
     * Applique une décision de contrôle selon la logique métier BTP (CLAUDE-METIER.md §5).
     *
     * Contrôle INTERNE : BPE | BAO | A_MODIFIER
     * Contrôle EXTERNE : FAVORABLE | DEFAVORABLE
     *
     * Règles :
     * - Un contrôle déjà décidé ne peut pas être redécidé
     * - La remarque est obligatoire pour A_MODIFIER et DEFAVORABLE
     * - La décision met à jour le statut du plan via Plan Service
     */
    public ControleDto applyDecision(String id, DecisionRequest request, String userId) {
        Controle controle = getOrThrow(id);

        // Règle : un contrôle déjà décidé est définitif
        if (controle.getDecision() != Decision.EN_ATTENTE) {
            throw new IllegalStateException("Ce contrôle a déjà une décision définitive");
        }

        // Règle : décisions valides selon le type de contrôle
        validateDecisionPourType(controle.getTypeControle(), request.getDecision());

        // Règle : remarque obligatoire en cas de rejet ou modification
        if ((request.getDecision() == Decision.A_MODIFIER || request.getDecision() == Decision.DEFAVORABLE)
                && (request.getRemarque() == null || request.getRemarque().isBlank())) {
            throw new IllegalArgumentException(
                    "La remarque est obligatoire en cas de rejet ou de demande de modification");
        }

        controle.setDecision(request.getDecision());
        controle.setRemarque(request.getRemarque());
        Controle saved = controleRepository.save(controle);

        // Mettre à jour le statut du plan via Plan Service
        String nouveauStatutPlan = mapDecisionVerStatutPlan(request.getDecision());
        if (nouveauStatutPlan != null) {
            updatePlanStatut(saved.getPlanId(), nouveauStatutPlan);
        }

        // Déterminer la routing key RabbitMQ selon la décision
        String routingKey = getRoutingKey(request.getDecision());
        if (routingKey != null) {
            BtpEvent event = BtpEvent.builder()
                    .routingKey(routingKey)
                    .entiteId(saved.getPlanId())
                    .entiteType("PLAN")
                    .userId(userId)
                    .message(buildDecisionMessage(request.getDecision(), saved.getPlanId()))
                    .timestamp(LocalDateTime.now())
                    .build();
            rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE, routingKey, event);
            log.info("Événement {} publié pour le contrôle {}", routingKey, id);
        }

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

    /**
     * Appose le visa final sur un plan.
     *
     * Conditions (CLAUDE-METIER.md §5 Étape 6) :
     * - Le contrôle interne doit être BPE ou BAO
     * - Si un contrôle externe existe, il doit être FAVORABLE
     */
    public ControleDto applyVisa(String id, String userId) {
        Controle controle = getOrThrow(id);
        List<Controle> tousCont = controleRepository.findByPlanId(controle.getPlanId());

        // Vérifier contrôle interne validé
        boolean interneOk = tousCont.stream()
                .filter(c -> c.getTypeControle() == TypeControle.INTERNE)
                .anyMatch(c -> c.getDecision() == Decision.BPE || c.getDecision() == Decision.BAO);

        if (!interneOk) {
            throw new IllegalStateException(
                    "Le contrôle interne doit être BPE ou BAO avant d'appliquer le visa");
        }

        // Vérifier contrôle externe si présent
        boolean hasExterne = tousCont.stream()
                .anyMatch(c -> c.getTypeControle() == TypeControle.EXTERNE);
        if (hasExterne) {
            boolean externeOk = tousCont.stream()
                    .filter(c -> c.getTypeControle() == TypeControle.EXTERNE)
                    .anyMatch(c -> c.getDecision() == Decision.FAVORABLE);
            if (!externeOk) {
                throw new IllegalStateException(
                        "Le contrôle externe doit être FAVORABLE avant d'appliquer le visa");
            }
        }

        // Mettre à jour le plan vers VISE
        updatePlanStatut(controle.getPlanId(), "VISE");

        BtpEvent event = BtpEvent.builder()
                .routingKey("visa.applique")
                .entiteId(controle.getPlanId())
                .entiteType("PLAN")
                .userId(userId)
                .message("Visa appliqué sur le plan " + controle.getPlanId())
                .timestamp(LocalDateTime.now())
                .build();
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE, "visa.applique", event);
        log.info("Visa appliqué pour le contrôle {} — plan {}", id, controle.getPlanId());

        return toDto(controle);
    }

    /* ── Helpers métier ──────────────────────────────────────────────── */

    /** Vérifie que la décision est cohérente avec le type de contrôle. */
    private void validateDecisionPourType(TypeControle type, Decision decision) {
        boolean valide = switch (type) {
            case INTERNE -> decision == Decision.BPE
                    || decision == Decision.BAO
                    || decision == Decision.A_MODIFIER;
            case EXTERNE -> decision == Decision.FAVORABLE
                    || decision == Decision.DEFAVORABLE;
        };
        if (!valide) {
            throw new IllegalArgumentException(
                    "Décision " + decision + " invalide pour un contrôle " + type
                    + ". Attendu: " + (type == TypeControle.INTERNE
                            ? "BPE | BAO | A_MODIFIER"
                            : "FAVORABLE | DEFAVORABLE"));
        }
    }

    /** Mappe une décision au nouveau statut du plan. */
    private String mapDecisionVerStatutPlan(Decision decision) {
        return switch (decision) {
            case BPE         -> "BON_POUR_EXECUTION";
            case BAO         -> "BON_AVEC_OBSERVATIONS";
            case A_MODIFIER  -> "A_MODIFIER";
            case FAVORABLE   -> "FAVORABLE";
            case DEFAVORABLE -> "DEFAVORABLE";
            default          -> null;
        };
    }

    /** Routing key RabbitMQ selon la décision. */
    private String getRoutingKey(Decision decision) {
        return switch (decision) {
            case BPE, BAO, FAVORABLE -> "controle.valide";
            case A_MODIFIER          -> "controle.modification";
            case DEFAVORABLE         -> "controle.refuse";
            default                  -> null;
        };
    }

    private String buildDecisionMessage(Decision decision, String planId) {
        return switch (decision) {
            case BPE        -> "Contrôle interne BPE — plan " + planId + " prêt pour l'étape suivante";
            case BAO        -> "Contrôle interne BAO — plan " + planId + " accepté avec observations";
            case A_MODIFIER -> "Contrôle interne — plan " + planId + " à modifier (corrections majeures)";
            case FAVORABLE  -> "Contrôle externe FAVORABLE — plan " + planId + " prêt pour le visa";
            case DEFAVORABLE-> "Contrôle externe DÉFAVORABLE — plan " + planId + " à corriger";
            default         -> "Décision " + decision + " pour le plan " + planId;
        };
    }

    /** Appelle Plan Service pour mettre à jour le statut du plan. */
    private void updatePlanStatut(String planId, String statut) {
        try {
            Map<String, String> body = new HashMap<>();
            body.put("statut", statut);
            String url = planServiceUrl + "/api/plans/" + planId + "/statut";
            ResponseEntity<Void> response = restTemplate.postForEntity(url, body, Void.class);
            log.info("Statut du plan {} mis à jour → {} (HTTP {})",
                    planId, statut, response.getStatusCode());
        } catch (Exception e) {
            log.error("Erreur lors de la mise à jour du statut du plan {} → {}: {}",
                    planId, statut, e.getMessage());
        }
    }

    /* ── Private helpers ─────────────────────────────────────────── */

    private Controle getOrThrow(String id) {
        return controleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contrôle non trouvé : " + id));
    }

    public ControleDto toDto(Controle c) {
        return ControleDto.builder()
                .id(c.getId())
                .planId(c.getPlanId())
                .versionId(c.getVersionId())
                .typeControle(c.getTypeControle())
                .controleurId(c.getControleurId())
                .dateControle(c.getDateControle())
                .decision(c.getDecision())
                .remarque(c.getRemarque())
                .commentaires(c.getCommentaires())
                .build();
    }
}
