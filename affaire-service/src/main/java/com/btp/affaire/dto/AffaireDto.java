package com.btp.affaire.dto;

import com.btp.affaire.model.HistoriqueEntry;
import com.btp.affaire.model.StatutAffaire;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class AffaireDto {
    private String id;
    private String reference;
    private String nom;
    private String description;
    private String client;
    private String localisation;
    private String chefProjetId;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private StatutAffaire statut;
    private String creePar;
    private LocalDateTime dateCreation;
    private LocalDateTime dateDerniereModification;
    private List<HistoriqueEntry> historique;
}
