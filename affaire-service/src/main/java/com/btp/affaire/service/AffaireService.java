package com.btp.affaire.service;

import com.btp.affaire.dto.AffaireDto;
import com.btp.affaire.dto.CreateAffaireRequest;
import com.btp.affaire.dto.UpdateAffaireRequest;
import com.btp.affaire.exception.ResourceNotFoundException;
import com.btp.affaire.model.Affaire;
import com.btp.affaire.model.HistoriqueEntry;
import com.btp.affaire.model.StatutAffaire;
import com.btp.affaire.repository.AffaireRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.Year;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AffaireService {

    private final AffaireRepository affaireRepository;

    public AffaireDto create(CreateAffaireRequest request, String userId) {
        String reference = generateReference();
        Affaire affaire = Affaire.builder()
                .reference(reference)
                .nom(request.getNom())
                .description(request.getDescription())
                .client(request.getClient())
                .localisation(request.getLocalisation())
                .chefProjetId(request.getChefProjetId())
                .dateDebut(request.getDateDebut())
                .dateFin(request.getDateFin())
                .statut(StatutAffaire.EN_PREPARATION)
                .creePar(userId)
                .dateDerniereModification(LocalDateTime.now())
                .build();

        affaire.getHistorique().add(HistoriqueEntry.builder()
                .action("CREATION")
                .date(LocalDateTime.now())
                .utilisateurId(userId)
                .details("Affaire créée avec la référence " + reference)
                .build());

        Affaire saved = affaireRepository.save(affaire);
        log.info("Affaire créée : {}", reference);
        return toDto(saved);
    }

    public Page<AffaireDto> findAll(Pageable pageable) {
        return affaireRepository.findAll(pageable).map(this::toDto);
    }

    public Page<AffaireDto> search(String nom, String statut, Pageable pageable) {
        if (nom != null && !nom.isBlank() && statut != null && !statut.isBlank()) {
            StatutAffaire s = StatutAffaire.valueOf(statut);
            return affaireRepository.findByNomContainingIgnoreCaseAndStatut(nom, s, pageable).map(this::toDto);
        } else if (nom != null && !nom.isBlank()) {
            return affaireRepository.findByNomContainingIgnoreCase(nom, pageable).map(this::toDto);
        } else if (statut != null && !statut.isBlank()) {
            StatutAffaire s = StatutAffaire.valueOf(statut);
            return affaireRepository.findByStatut(s, pageable).map(this::toDto);
        }
        return affaireRepository.findAll(pageable).map(this::toDto);
    }

    public AffaireDto findById(String id) {
        return toDto(getOrThrow(id));
    }

    public AffaireDto update(String id, UpdateAffaireRequest request, String userId) {
        Affaire affaire = getOrThrow(id);
        // Règle métier : une affaire ANNULEE ne peut plus être modifiée
        if (affaire.getStatut() == StatutAffaire.ANNULEE) {
            throw new IllegalStateException("Une affaire annulée ne peut plus être modifiée");
        }
        affaire.setNom(request.getNom());
        affaire.setDescription(request.getDescription());
        if (request.getClient() != null)      affaire.setClient(request.getClient());
        if (request.getLocalisation() != null) affaire.setLocalisation(request.getLocalisation());
        if (request.getChefProjetId() != null) affaire.setChefProjetId(request.getChefProjetId());
        if (request.getDateDebut() != null)   affaire.setDateDebut(request.getDateDebut());
        if (request.getDateFin() != null)     affaire.setDateFin(request.getDateFin());
        if (request.getStatut() != null)      affaire.setStatut(request.getStatut());
        affaire.setDateDerniereModification(LocalDateTime.now());

        affaire.getHistorique().add(HistoriqueEntry.builder()
                .action("MODIFICATION")
                .date(LocalDateTime.now())
                .utilisateurId(userId)
                .details("Affaire modifiée")
                .build());

        return toDto(affaireRepository.save(affaire));
    }

    public void delete(String id, String userId) {
        Affaire affaire = getOrThrow(id);
        affaire.setStatut(StatutAffaire.ANNULEE);
        affaire.setDateDerniereModification(LocalDateTime.now());
        affaire.getHistorique().add(HistoriqueEntry.builder()
                .action("SUPPRESSION")
                .date(LocalDateTime.now())
                .utilisateurId(userId)
                .details("Affaire supprimée (annulée)")
                .build());
        affaireRepository.save(affaire);
        log.info("Affaire {} supprimée (annulée)", id);
    }

    public List<HistoriqueEntry> getHistorique(String id) {
        return getOrThrow(id).getHistorique();
    }

    /* ── Private helpers ─────────────────────────────────────── */

    private Affaire getOrThrow(String id) {
        return affaireRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Affaire non trouvée : " + id));
    }

    private String generateReference() {
        int year = Year.now().getValue();
        long count = affaireRepository.count() + 1;
        return String.format("AFF-%d-%03d", year, count);
    }

    public AffaireDto toDto(Affaire a) {
        return AffaireDto.builder()
                .id(a.getId())
                .reference(a.getReference())
                .nom(a.getNom())
                .description(a.getDescription())
                .client(a.getClient())
                .localisation(a.getLocalisation())
                .chefProjetId(a.getChefProjetId())
                .dateDebut(a.getDateDebut())
                .dateFin(a.getDateFin())
                .statut(a.getStatut())
                .creePar(a.getCreePar())
                .dateCreation(a.getDateCreation())
                .dateDerniereModification(a.getDateDerniereModification())
                .historique(a.getHistorique())
                .build();
    }
}
