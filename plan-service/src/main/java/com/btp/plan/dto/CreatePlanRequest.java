package com.btp.plan.dto;

import com.btp.plan.model.NiveauPlan;
import com.btp.plan.model.TypePlan;
import com.btp.plan.model.TypePrestation;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CreatePlanRequest {

    private String numeroPlan;         // Numéro d'affaire unique (optionnel, auto-généré si absent)

    @NotBlank(message = "L'affaireId est obligatoire")
    private String affaireId;

    @NotBlank(message = "Le nom est obligatoire")
    private String nom;

    @NotNull(message = "Le type de plan est obligatoire")
    private TypePlan typePlan;

    private TypePrestation typePrestation; // PDB | PS (défaut PDB)

    private NiveauPlan niveau;

    private String lot;

    private String auteur;

    private String projeteurId;

    private Integer nombrePlanches;

    private LocalDate dateEngagement;

    private String commentaire;

    private String fichierUrl;         // Fichier initial (optionnel)
}
