// Modèle principal de l'entité Affaire
package com.btp.affaire.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "affaires")
public class Affaire {

    @Id
    private String id;

    @Indexed(unique = true)
    private String reference; // AFF-2024-001

    private String nom;
    private String description;
    private String client;        // Maître d'ouvrage (ex: Ministère, Promoteur)
    private String localisation;  // Ville / adresse du chantier
    private String chefProjetId;  // userId du chef de projet responsable
    private LocalDate dateDebut;
    private LocalDate dateFin;

    @Builder.Default
    private StatutAffaire statut = StatutAffaire.EN_PREPARATION;

    private String creePar; // userId

    @CreatedDate
    private LocalDateTime dateCreation;

    private LocalDateTime dateDerniereModification;

    @Builder.Default
    private List<HistoriqueEntry> historique = new ArrayList<>();
}
