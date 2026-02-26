package com.btp.plan.dto;

import com.btp.plan.model.NiveauPlan;
import com.btp.plan.model.TypePlan;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreatePlanRequest {

    @NotBlank(message = "L'affaireId est obligatoire")
    private String affaireId;

    @NotBlank(message = "Le nom est obligatoire")
    private String nom;

    @NotNull(message = "Le type de plan est obligatoire")
    private TypePlan typePlan;

    private NiveauPlan niveau;      // Zone/niveau du bâtiment (RDC, ETG1...)

    private String lot;             // Lot de l'affaire (ex: GC, CHARP)

    private String projeteurId;     // userId projeteur assigné

    private String commentaire;

    // Optionnel : URL si fichier pré-uploadé, sinon via POST /{id}/upload
    private String fichierUrl;
}
