package com.btp.plan.service;

import com.btp.plan.config.RabbitMQConfig;
import com.btp.plan.dto.*;
import com.btp.plan.event.BtpEvent;
import com.btp.plan.exception.ResourceNotFoundException;
import com.btp.plan.model.*;
import com.btp.plan.repository.PlanArchiveRepository;
import com.btp.plan.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlanService {

    private final PlanRepository planRepository;
    private final PlanArchiveRepository planArchiveRepository;
    private final RabbitTemplate rabbitTemplate;

    /**
     * Crée un plan en BROUILLON avec la version initiale (indice "-").
     */
    public PlanDto create(CreatePlanRequest request, String userId) {
        Version v1 = Version.builder()
                .idVersion(UUID.randomUUID().toString())
                .numeroVersion(1)
                .indice("-")
                .dateUpload(LocalDateTime.now())
                .commentaire(request.getCommentaire())
                .fichierUrl(request.getFichierUrl())
                .uploadePar(userId)
                .build();

        String numeroPlan = request.getNumeroPlan() != null && !request.getNumeroPlan().isBlank()
                ? request.getNumeroPlan()
                : null;

        Plan plan = Plan.builder()
                .numeroPlan(numeroPlan)
                .affaireId(request.getAffaireId())
                .nom(request.getNom())
                .typePlan(request.getTypePlan())
                .typePrestation(request.getTypePrestation() != null ? request.getTypePrestation() : TypePrestation.PDB)
                .niveau(request.getNiveau())
                .lot(request.getLot())
                .auteur(request.getAuteur())
                .projeteurId(request.getProjeteurId() != null ? request.getProjeteurId() : userId)
                .nombrePlanches(request.getNombrePlanches())
                .dateEngagement(request.getDateEngagement())
                .indiceInterne("-")
                .statut(StatutPlan.BROUILLON)
                .etat(EtatPlan.EN_COURS)
                .creePar(userId)
                .build();

        plan.getVersions().add(v1);
        if (request.getFichierUrl() != null && !request.getFichierUrl().isBlank()) {
            plan.getFichiers().add(request.getFichierUrl());
        }
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
     * Modifie un plan (archive l'état courant avant modification).
     */
    public PlanDto update(String id, UpdatePlanRequest request, String userId) {
        Plan plan = getOrThrow(id);
        if (plan.isArchived()) {
            throw new IllegalStateException("Ce plan est archivé et ne peut plus être modifié");
        }

        // Archiver l'état actuel avant modification
        archiverSnapshot(plan, userId);

        if (request.getNom() != null)             plan.setNom(request.getNom());
        if (request.getTypePrestation() != null)  plan.setTypePrestation(request.getTypePrestation());
        if (request.getNiveau() != null)          plan.setNiveau(request.getNiveau());
        if (request.getLot() != null)             plan.setLot(request.getLot());
        if (request.getAuteur() != null)          plan.setAuteur(request.getAuteur());
        if (request.getProjeteurId() != null)     plan.setProjeteurId(request.getProjeteurId());
        if (request.getNombrePlanches() != null)  plan.setNombrePlanches(request.getNombrePlanches());
        if (request.getDateEngagement() != null)  plan.setDateEngagement(request.getDateEngagement());

        plan.getHistorique().add(HistoriqueEntry.builder()
                .action("MODIFICATION")
                .date(LocalDateTime.now())
                .utilisateurId(userId)
                .details("Plan modifié")
                .build());

        Plan saved = planRepository.save(plan);

        // Notifier
        publishEvent("plan.modifie", saved.getId(), "PLAN", userId,
                "Le plan '" + saved.getNom() + "' a été modifié", saved.getProjeteurId());

        return toDto(saved);
    }

    /**
     * Suppression logique (archived = true).
     */
    public void softDelete(String id, String userId) {
        Plan plan = getOrThrow(id);
        archiverSnapshot(plan, userId);
        plan.setArchived(true);
        plan.getHistorique().add(HistoriqueEntry.builder()
                .action("SUPPRESSION")
                .date(LocalDateTime.now())
                .utilisateurId(userId)
                .details("Plan supprimé (archivé logiquement)")
                .build());
        planRepository.save(plan);
        log.info("Plan {} supprimé (archivé logiquement)", id);
    }

    /**
     * Émet officiellement un plan (BROUILLON → EMIS, indice "-" → "A").
     */
    public PlanDto emettre(String id, String userId) {
        Plan plan = getOrThrow(id);

        if (plan.getStatut() != StatutPlan.BROUILLON) {
            throw new IllegalStateException(
                    "Seul un plan en BROUILLON peut être émis. Statut actuel : " + plan.getStatut());
        }

        Version derniereVersion = getLastVersion(plan);
        if (derniereVersion == null) {
            throw new IllegalStateException("Le plan n'a aucune version à émettre");
        }

        if ("-".equals(derniereVersion.getIndice())) {
            derniereVersion.setIndice("A");
        }

        plan.setEmetteurId(userId);
        plan.setStatut(StatutPlan.EMIS);
        plan.setIndiceInterne(derniereVersion.getIndice());
        plan.setIndiceExterne(derniereVersion.getIndice());
        plan.getHistorique().add(HistoriqueEntry.builder()
                .action("EMISSION")
                .date(LocalDateTime.now())
                .utilisateurId(userId)
                .details("Plan émis officiellement — Indice " + derniereVersion.getIndice())
                .build());

        Plan saved = planRepository.save(plan);

        publishEvent("plan.emis", saved.getId(), "PLAN", userId,
                "Le plan '" + saved.getNom() + "' a été émis (Indice " + derniereVersion.getIndice() + ")",
                saved.getProjeteurId());

        return toDto(saved);
    }

    /**
     * Soumet un plan EMIS au contrôle interne.
     */
    public PlanDto soumettre(String id, String userId) {
        Plan plan = getOrThrow(id);

        if (plan.getStatut() != StatutPlan.EMIS) {
            throw new IllegalStateException(
                    "Le plan doit être EMIS avant d'être soumis. Statut actuel : " + plan.getStatut());
        }

        plan.setStatut(StatutPlan.EN_CONTROLE_INTERNE);
        plan.getHistorique().add(HistoriqueEntry.builder()
                .action("SOUMISSION_CONTROLE")
                .date(LocalDateTime.now())
                .utilisateurId(userId)
                .details("Plan soumis au contrôle interne")
                .build());

        Plan saved = planRepository.save(plan);

        publishEvent("plan.soumis", saved.getId(), "PLAN", userId,
                "Le plan '" + saved.getNom() + "' a été soumis au contrôle interne",
                saved.getProjeteurId());

        return toDto(saved);
    }

    /**
     * Ajoute un fichier à la liste des fichiers du plan.
     */
    public PlanDto addFichier(String id, String fichierUrl, String userId) {
        Plan plan = getOrThrow(id);
        plan.getFichiers().add(fichierUrl);
        plan.getHistorique().add(HistoriqueEntry.builder()
                .action("FICHIER_AJOUTE")
                .date(LocalDateTime.now())
                .utilisateurId(userId)
                .details("Fichier ajouté : " + fichierUrl)
                .build());

        Plan saved = planRepository.save(plan);

        publishEvent("plan.fichier-ajoute", saved.getId(), "PLAN", userId,
                "Un fichier a été ajouté au plan '" + saved.getNom() + "'",
                saved.getProjeteurId());

        return toDto(saved);
    }

    /**
     * Ajoute une nouvelle version après un rejet (VAO).
     */
    public PlanDto addVersion(String id, AddVersionRequest request, String userId) {
        Plan plan = getOrThrow(id);

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
        plan.setStatut(StatutPlan.BROUILLON);
        plan.setIndiceInterne(nextIndice);
        plan.getHistorique().add(HistoriqueEntry.builder()
                .action("NOUVELLE_VERSION")
                .date(LocalDateTime.now())
                .utilisateurId(userId)
                .details("Nouvelle version " + nextNumero + " — Indice " + nextIndice)
                .build());

        if (request.getFichierUrl() != null && !request.getFichierUrl().isBlank()) {
            plan.getFichiers().add(request.getFichierUrl());
        }

        Plan saved = planRepository.save(plan);

        publishEvent("plan.nouvelle-version", saved.getId(), "PLAN", userId,
                "Nouvelle version (Indice " + nextIndice + ") créée pour le plan '" + saved.getNom() + "'",
                saved.getProjeteurId());

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
        log.info("Statut du plan {} → {}", id, statut);
        return toDto(saved);
    }

    /**
     * Met à jour l'état du plan — appelé par controle-service via REST.
     */
    public PlanDto updateEtat(String id, String etat) {
        Plan plan = getOrThrow(id);
        EtatPlan nouvelEtat = EtatPlan.valueOf(etat);
        plan.setEtat(nouvelEtat);
        plan.getHistorique().add(HistoriqueEntry.builder()
                .action("CHANGEMENT_ETAT")
                .date(LocalDateTime.now())
                .utilisateurId("SYSTEM")
                .details("État mis à jour → " + etat + " (via controle-service)")
                .build());

        Plan saved = planRepository.save(plan);
        log.info("État du plan {} → {}", id, etat);

        // Notifier le changement d'état
        publishEvent("plan.etat-change", saved.getId(), "PLAN", "SYSTEM",
                "Le plan '" + saved.getNom() + "' a changé d'état : " + etat,
                saved.getProjeteurId());

        return toDto(saved);
    }

    /** Retourne l'historique des archives d'un plan. */
    public List<PlanArchive> getArchives(String id) {
        getOrThrow(id); // vérifier existence
        return planArchiveRepository.findByPlanIdOrderByDateArchiveDesc(id);
    }

    public Page<PlanDto> findByAffaire(String affaireId, Pageable pageable) {
        return planRepository.findByAffaireIdAndArchivedFalse(affaireId, pageable).map(this::toDto);
    }

    public Page<PlanDto> search(String typePlan, String statut, Pageable pageable) {
        if (typePlan != null && !typePlan.isBlank() && statut != null && !statut.isBlank()) {
            return planRepository.findByTypePlanAndStatutAndArchivedFalse(
                    TypePlan.valueOf(typePlan), StatutPlan.valueOf(statut), pageable).map(this::toDto);
        } else if (typePlan != null && !typePlan.isBlank()) {
            return planRepository.findByTypePlanAndArchivedFalse(TypePlan.valueOf(typePlan), pageable).map(this::toDto);
        } else if (statut != null && !statut.isBlank()) {
            return planRepository.findByStatutAndArchivedFalse(StatutPlan.valueOf(statut), pageable).map(this::toDto);
        }
        return planRepository.findByArchivedFalse(pageable).map(this::toDto);
    }

    public PlanDto findById(String id) {
        return toDto(getOrThrow(id));
    }

    public List<VersionDto> getVersions(String id) {
        return getOrThrow(id).getVersions().stream()
                .map(this::toVersionDto)
                .collect(Collectors.toList());
    }

    /* ── Archivage ─────────────────────────────────────────── */

    private void archiverSnapshot(Plan plan, String modifiePar) {
        PlanArchive archive = PlanArchive.builder()
                .planId(plan.getId())
                .dateArchive(LocalDateTime.now())
                .modifiePar(modifiePar)
                .numeroPlan(plan.getNumeroPlan())
                .nom(plan.getNom())
                .typePlanStr(plan.getTypePlan() != null ? plan.getTypePlan().name() : null)
                .typePrestationStr(plan.getTypePrestation() != null ? plan.getTypePrestation().name() : null)
                .niveauStr(plan.getNiveau() != null ? plan.getNiveau().name() : null)
                .lot(plan.getLot())
                .auteur(plan.getAuteur())
                .projeteurId(plan.getProjeteurId())
                .nombrePlanches(plan.getNombrePlanches())
                .indiceInterne(plan.getIndiceInterne())
                .indiceExterne(plan.getIndiceExterne())
                .statutStr(plan.getStatut() != null ? plan.getStatut().name() : null)
                .etatStr(plan.getEtat() != null ? plan.getEtat().name() : null)
                .fichiers(new ArrayList<>(plan.getFichiers()))
                .versions(new ArrayList<>(plan.getVersions()))
                .build();
        planArchiveRepository.save(archive);
    }

    /* ── Event helper ──────────────────────────────────────── */

    private void publishEvent(String routingKey, String entiteId, String entiteType,
                              String userId, String message, String destinataireId) {
        BtpEvent event = BtpEvent.builder()
                .routingKey(routingKey)
                .entiteId(entiteId)
                .entiteType(entiteType)
                .userId(userId)
                .message(message)
                .destinataireId(destinataireId)
                .timestamp(LocalDateTime.now())
                .build();
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE, routingKey, event);
        log.debug("Événement {} publié pour {}", routingKey, entiteId);
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
                .numeroPlan(p.getNumeroPlan())
                .affaireId(p.getAffaireId())
                .nom(p.getNom())
                .typePlan(p.getTypePlan())
                .typePrestation(p.getTypePrestation())
                .niveau(p.getNiveau())
                .lot(p.getLot())
                .auteur(p.getAuteur())
                .projeteurId(p.getProjeteurId())
                .emetteurId(p.getEmetteurId())
                .nombrePlanches(p.getNombrePlanches())
                .dateEngagement(p.getDateEngagement())
                .indiceInterne(p.getIndiceInterne())
                .indiceExterne(p.getIndiceExterne())
                .statut(p.getStatut())
                .etat(p.getEtat())
                .archived(p.isArchived())
                .dateCreation(p.getDateCreation())
                .creePar(p.getCreePar())
                .fichiers(p.getFichiers())
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
