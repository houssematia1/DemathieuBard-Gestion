package com.btp.controle.dto;

import com.btp.controle.model.Decision;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DecisionRequest {
    @NotNull(message = "L'avis est obligatoire")
    private Decision decision;   // VSO | VAC | VAO

    private String remarque;     // Obligatoire si VAO

    private String fichierPDF;   // URL du rapport PDF (optionnel)
}
