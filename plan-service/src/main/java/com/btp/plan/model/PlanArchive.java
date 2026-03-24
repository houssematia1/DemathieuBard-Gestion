package com.btp.plan.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * Snapshot complet d'un plan avant chaque modification.
 * Permet de consulter l'historique complet des versions.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "plan_archives")
public class PlanArchive {

    @Id
    private String id;

    private String planId;           // Référence au plan original
    private LocalDateTime dateArchive; // Date de la sauvegarde
    private String modifiePar;       // userId de l'utilisateur qui a modifié

    // Snapshot complet des attributs du plan au moment de l'archivage
    private String numeroPlan;
    private String nom;
    private String typePlanStr;      // TypePlan.name()
    private String typePrestationStr;
    private String niveauStr;
    private String lot;
    private String auteur;
    private String projeteurId;
    private Integer nombrePlanches;
    private String indiceInterne;
    private String indiceExterne;
    private String statutStr;        // StatutPlan.name()
    private String etatStr;          // EtatPlan.name()
    private java.util.List<String> fichiers;
    private java.util.List<Version> versions;
}
