package com.btp.controle.dto;

import com.btp.controle.model.TypeControle;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateControleRequest {
    @NotBlank(message = "Le planId est obligatoire")
    private String planId;

    @NotBlank(message = "Le versionId est obligatoire")
    private String versionId;

    @NotNull(message = "Le type de contrôle est obligatoire")
    private TypeControle typeControle;

    private String controleurId;
}
