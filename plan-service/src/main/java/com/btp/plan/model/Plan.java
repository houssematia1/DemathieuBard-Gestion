package com.btp.plan.model;

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
@Document(collection = "plans")
public class Plan {

    @Id
    private String id;

    @Indexed(unique = true, sparse = true)
    private String numeroPlan;       // Numéro d'affaire unique (ex: COF-001-A)

    private String affaireId;
    private String nom;              // Nom/titre du plan
    private TypePlan typePlan;       // COF, FER, NCAL, EXE, SYN
    private TypePrestation typePrestation; // PDB (De Base) | PS (Supplémentaire)
    private NiveauPlan niveau;       // Zone/niveau du bâtiment (RDC, ETG1, SS1...)
    private String lot;              // Lot de l'affaire (ex: GC, CHARP, ELEC)
    private String auteur;           // Nom de l'auteur/concepteur du plan
    private String projeteurId;      // userId du projeteur assigné
    private String emetteurId;       // userId de l'émetteur

    private Integer nombrePlanches;  // Nombre de planches/feuilles du plan
    private LocalDate dateEngagement; // Date d'engagement prévue pour le livrable

    private String indiceInterne;    // Indice interne courant (A, B, C... ou 1, 2, 3...)
    private String indiceExterne;    // Indice externe officiel (diffusé)

    @Builder.Default
    private StatutPlan statut = StatutPlan.BROUILLON; // Workflow technique de contrôle

    @Builder.Default
    private EtatPlan etat = EtatPlan.NON_COMMENCE;    // État de production (chantier)

    @Builder.Default
    private boolean archived = false; // Suppression logique

    @CreatedDate
    private LocalDateTime dateCreation;

    private String creePar;          // userId créateur

    @Builder.Default
    private List<String> fichiers = new ArrayList<>();  // URLs des fichiers attachés (PDF, DWG, etc.)

    @Builder.Default
    private List<Version> versions = new ArrayList<>();

    @Builder.Default
    private List<HistoriqueEntry> historique = new ArrayList<>();
}
