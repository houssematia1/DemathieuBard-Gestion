package com.btp.controle.dto;

import com.btp.controle.model.Decision;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DecisionRequest {
    @NotNull(message = "La décision est obligatoire")
    private Decision decision;

    private String remarque;
}
