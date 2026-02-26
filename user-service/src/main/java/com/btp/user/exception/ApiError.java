package com.btp.user.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Structure standard des réponses d'erreur de l'API.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiError {

    private int statut;
    private String erreur;
    private String message;
    private LocalDateTime timestamp;

    /** Détails de validation (liste de messages d'erreur de champs) */
    private List<String> details;
}
