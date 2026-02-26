package com.btp.plan.service;

import com.btp.plan.config.RabbitMQConfig;
import com.btp.plan.dto.AddVersionRequest;
import com.btp.plan.dto.CreatePlanRequest;
import com.btp.plan.dto.PlanDto;
import com.btp.plan.dto.VersionDto;
import com.btp.plan.event.BtpEvent;
import com.btp.plan.exception.ResourceNotFoundException;
import com.btp.plan.model.*;
import com.btp.plan.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlanService {

    private final PlanRepository planRepository;
    private final RabbitTemplate rabbitTemplate;

    /**
     * Crée un plan en BROUILLON.
     * La version initiale reçoit l'indice "-" (pas encore émis officiellement).
     * L'indice "A" sera assigné lors de l'émission (POST /{id}/emettre).
     */
    public PlanDto create(CreatePlanRequest request, String userId) {
        // Version initiale : numéro 1, indice "-" (brouillon interne)
        Version v1 = Version.builder()
                .idVersion(UUID.randomUUID().toString())
                .numeroVersion(1)
                .indice("-")
                .dateUpload(LocalDateTime.now())
                .commentaire(request.getCommentaire())
                .fichierUrl(request.getFichierUrl())
                .uploadePar(userId)
                .build();

        Plan plan = Plan.builder()
                .affaireId(request.getAffaireId())
                .nom(request.getNom())
                .typePlan(request.getTypePlan())
                .niveau(request.getNiveau())
                .lot(request.getLot())
                .projeteurId(request.getProjeteurId() != null ? request.getProjeteurId() : userId)
                .statut(StatutPlan.BROUILLON)
                .creePar(userId)
                .build();

        plan.getVersions().add(v1);
        plan.getHistorique().add(HistoriqueEntry.builder()
                .action("CREATION")
                .date(LocalDateTime.now())
                .utilisateurId(userId)
                .details("Plan créé — Version 1, Indice \"-\" (brouillon)")
                .build());

        Plan saved = planRepository.save(plan);
        log.info("Plan créé : {} pour l'affaire {}", saved.getId(), request.getAffaireId());
        return toDto(saved);
    }

    /**
     * Émet officiellement un plan (BROUILLON → EMIS).
     *
     * Règles (CLAUDE-METIER.md §5 Étape 2) :
     * - Le plan doit être en statut BROUILLON
     * - L'indice de la dernière version passe de "-" à "A" (première émission)
     * - Les émissions suivantes utilisent l'indice déjà attribué lors de addVersion
     * - Publie l'événement RabbitMQ "plan.emis"
     */
    public PlanDto emettre(String id, String userId) {
        Plan plan = getOrThrow(id);

        if (plan.getStatut() != StatutPlan.BROUILLON) {
            throw new IllegalStateException(
                    "Seul un plan en BROUILLON peut être émis. Statut actuel : " + plan.getStatut());
        }

        // Récupérer la dernière version et lui attribuer l'indice officiel
        Version derniereVersion = getLastVersion(plan);
        if (derniereVersion == null) {
            throw new IllegalStateException("Le plan n'a aucune version à émettre");
        }

        // Si l'indice est encore "-", c'est la première émission → indice "A"
        if ("-".equals(derniereVersion.getIndice())) {
            derniereVersion.setIndice("A");
        }
        // Sinon l'indice a déjà été défini lors de addVersion (B, C, D…)

        plan.setEmetteurId(userId);
        plan.setStatut(StatutPlan.EMIS);
        plan.getHistorique().add(HistoriqueEntry.builder()
                .action("EMISSION")
                .date(LocalDateTime.now())
                .utilisateurId(userId)
                .details("Plan émis officiellement — Indice " + derniereVersion.getIndice())
                .build());

        Plan saved = planRepository.save(plan);

        // Événement RabbitMQ
        BtpEvent event = BtpEvent.builder()
                .routingKey("plan.emis")
                .entiteId(saved.getId())
                .entiteType("PLAN")
                .userId(userId)
                .message("Le plan '" + saved.getNom() + "' a été émis (Indice "
                        + derniereVersion.getIndice() + ")")
                .timestamp(LocalDateTime.now())
                .build();
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE, "plan.emis", event);
        log.info("Événement plan.emis publié — plan {} indice {}", id, derniereVersion.getIndice());

        return toDto(saved);
    }

    /**
     * Soumet un plan EMIS au contrôle interne.
     *
     * Règle : le plan doit être EMIS (pas BROUILLON — il faut d'abord emettre).
     */
    public PlanDto soumettre(String id, String userId) {
        Plan plan = getOrThrow(id);

        if (plan.getStatut() != StatutPlan.EMIS) {
            throw new IllegalStateException(
                    "Le plan doit être EMIS avant de pouvoir être soumis au contrôle. "
                    + "Statut actuel : " + plan.getStatut());
        }

        plan.setStatut(StatutPlan.EN_CONTROLE_INTERNE);
        plan.getHistorique().add(HistoriqueEntry.builder()
                .action("SOUMISSION_CONTROLE")
                .date(LocalDateTime.now())
                .utilisateurId(userId)
                .details("Plan soumis au contrôle interne")
                .build());

        Plan saved = planRepository.save(plan);

        BtpEvent event = BtpEvent.builder()
                .routingKey("plan.soumis")
                .entiteId(saved.getId())
                .entiteType("PLAN")
                .userId(userId)
                .message("Le plan '" + saved.getNom() + "' a été soumis au contrôle interne")
                .timestamp(LocalDateTime.now())
                .build();
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE, "plan.soumis", event);
        log.info("Événement plan.soumis publié pour le plan {}", id);

        return toDto(saved);
    }

    /**
     * Ajoute une nouvelle version après un rejet.
     *
     * L'indice de la nouvelle version est la prochaine lettre après toutes
     * les versions officiellement émises (indice != "-").
     * Ex : si les versions A et B ont été émises → nouvelle version = C
     */
    public PlanDto addVersion(String id, AddVersionRequest request, String userId) {
        Plan plan = getOrThrow(id);

        // Calculer le prochain indice : compter les versions réellement émises (indice != "-")
        long emissionsCount = plan.getVersions().stream()
                .filter(v -> !"-".equals(v.getIndice()))
                .count();
        String nextIndice = String.valueOf((char) ('A' + emissionsCount));
        int nextNumero = plan.getVersions().size() + 1;

        Version newVersion = Version.builder()
                .idVersion(UUID.randomUUID().toString())
                .numeroVersion(nextNumero)
                .indice(nextIndice)
                .dateUpload(LocalDateTime.now())
                .commentaire(request.getCommentaire())
                .fichierUrl(request.getFichierUrl())
                .uploadePar(userId)
                .build();

        plan.getVersions().add(newVersion);
        plan.setStatut(StatutPlan.BROUILLON);  // Le projeteur doit ré-émettre
        plan.getHistorique().add(HistoriqueEntry.builder()
                .action("NOUVELLE_VERSION")
                .date(LocalDateTime.now())
                .utilisateurId(userId)
                .details("Nouvelle version " + nextNumero + " créée — Indice " + nextIndice
                        + " (en attente d'émission)")
                .build());

        Plan saved = planRepository.save(plan);

        // Événement RabbitMQ
        BtpEvent event = BtpEvent.builder()
                .routingKey("plan.nouvelle-version")
                .entiteId(saved.getId())
                .entiteType("PLAN")
                .userId(userId)
                .message("Nouvelle version (Indice " + nextIndice + ") créée pour le plan '"
                        + saved.getNom() + "'")
                .timestamp(LocalDateTime.now())
                .build();
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE, "plan.nouvelle-version", event);
        log.info("Nouvelle version {} (Indice {}) ajoutée au plan {}", nextNumero, nextIndice, id);

        return toDto(saved);
    }

    /**
     * Met à jour le statut d'un plan — appelé par controle-service via REST.
     */
    public PlanDto updateStatut(String id, String statut) {
        Plan plan = getOrThrow(id);
        StatutPlan nouveauStatut = StatutPlan.valueOf(statut);
        plan.setStatut(nouveauStatut);
        plan.getHistorique().add(HistoriqueEntry.builder()
                .action("CHANGEMENT_STATUT")
                .date(LocalDateTime.now())
                .utilisateurId("SYSTEM")
                .details("Statut mis à jour → " + statut + " (via controle-service)")
                .build());
        Plan saved = planRepository.save(plan);
        log.info("Statut du plan {} mis à jour → {}", id, statut);
        return toDto(saved);
    }

    public Page<PlanDto> findByAffaire(String affaireId, Pageable pageable) {
        return planRepository.findByAffaireId(affaireId, pageable).map(this::toDto);
    }

    public Page<PlanDto> search(String typePlan, String statut, Pageable pageable) {
        if (typePlan != null && !typePlan.isBlank() && statut != null && !statut.isBlank()) {
            return planRepository.findByTypePlanAndStatut(
                    TypePlan.valueOf(typePlan), StatutPlan.valueOf(statut), pageable).map(this::toDto);
        } else if (typePlan != null && !typePlan.isBlank()) {
            return planRepository.findByTypePlan(TypePlan.valueOf(typePlan), pageable).map(this::toDto);
        } else if (statut != null && !statut.isBlank()) {
            return planRepository.findByStatut(StatutPlan.valueOf(statut), pageable).map(this::toDto);
        }
        return planRepository.findAll(pageable).map(this::toDto);
    }

    public PlanDto findById(String id) {
        return toDto(getOrThrow(id));
    }

    public List<VersionDto> getVersions(String id) {
        return getOrThrow(id).getVersions().stream()
                .map(this::toVersionDto)
                .collect(Collectors.toList());
    }

    /* ── Private helpers ─────────────────────────────────────────── */

    private Plan getOrThrow(String id) {
        return planRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Plan non trouvé : " + id));
    }

    private Version getLastVersion(Plan plan) {
        List<Version> versions = plan.getVersions();
        return versions.isEmpty() ? null : versions.get(versions.size() - 1);
    }

    public PlanDto toDto(Plan p) {
        List<VersionDto> versions = p.getVersions().stream()
                .map(this::toVersionDto)
                .collect(Collectors.toList());
        VersionDto derniere = versions.isEmpty() ? null : versions.get(versions.size() - 1);
        return PlanDto.builder()
                .id(p.getId())
                .affaireId(p.getAffaireId())
                .nom(p.getNom())
                .typePlan(p.getTypePlan())
                .niveau(p.getNiveau())
                .lot(p.getLot())
                .projeteurId(p.getProjeteurId())
                .emetteurId(p.getEmetteurId())
                .statut(p.getStatut())
                .dateCreation(p.getDateCreation())
                .creePar(p.getCreePar())
                .versions(versions)
                .derniereVersion(derniere)
                .historique(p.getHistorique())
                .build();
    }

    private VersionDto toVersionDto(Version v) {
        return VersionDto.builder()
                .idVersion(v.getIdVersion())
                .numeroVersion(v.getNumeroVersion())
                .indice(v.getIndice())
                .dateUpload(v.getDateUpload())
                .commentaire(v.getCommentaire())
                .fichierUrl(v.getFichierUrl())
                .uploadePar(v.getUploadePar())
                .build();
    }
}
