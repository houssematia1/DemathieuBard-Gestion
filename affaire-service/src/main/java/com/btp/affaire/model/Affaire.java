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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "affaires")
public class Affaire {

    @Id
    private String id;

    @Indexed(unique = true)
    private String reference;     // AFF-2024-001 (= numAffaire)

    private String nom;           // Nom de l'affaire (= nomAffaire)
    private String description;
    private String client;        // Maître d'ouvrage
    private String localisation;  // Adresse / ville du chantier
    private String chefProjetId;  // userId du chef de projet
    private LocalDate dateDebut;
    private LocalDate dateFin;    // Date de fin prévue (= dateFinPrevue)

    @Builder.Default
    private StatutAffaire statut = StatutAffaire.EN_PREPARATION;

    // ── Avancement calculé ─────────────────────────────────────────
    @Builder.Default
    private Double avancement = 0.0;  // Pourcentage global calculé (0 à 100)

    /**
     * Pourcentages d'avancement par état de plan.
     * Clés : DEMARRE, PREMIER_INDICE_DIFFUSE, CONTROLE_EXTERNE, VAO, VISE_BPE
     * Valeurs : pourcentages (doivent sommer à 100)
     */
    @Builder.Default
    private Map<String, Integer> pourcentagesParEtat = new HashMap<>(Map.of(
            "DEMARRE",                  25,
            "PREMIER_INDICE_DIFFUSE",   30,
            "CONTROLE_EXTERNE",         10,
            "VAO",                      15,
            "VISE_BPE",                 20
    ));

    /**
     * Coefficients de pondération par type de livrable.
     * COF=1, FER=3, NCAL=5, EXE=1, SYN=1
     */
    @Builder.Default
    private Map<String, Integer> coefficientsParType = new HashMap<>(Map.of(
            "COF",  1,
            "FER",  3,
            "NCAL", 5,
            "EXE",  1,
            "SYN",  1
    ));

    private String creePar;

    @CreatedDate
    private LocalDateTime dateCreation;

    private LocalDateTime dateDerniereModification;

    @Builder.Default
    private List<HistoriqueEntry> historique = new ArrayList<>();
}
