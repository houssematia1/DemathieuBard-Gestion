package com.btp.controle.dto;

import com.btp.controle.model.TypeControle;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateControleRequest {

    private String reference;          // Optionnel — généré automatiquement si absent

    @NotBlank(message = "Le planId est obligatoire")
    private String planId;

    private String versionId;

    private String indiceExterneImpacte; // Indice externe du plan au moment du contrôle

    @NotNull(message = "Le type de contrôle est obligatoire")
    private TypeControle typeControle;

    private String controleurId;       // Optionnel — par défaut l'utilisateur connecté

    private String projeteurId;        // Projeteur du plan (pour les notifications)
}
