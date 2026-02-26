package com.btp.user.dto;

import com.btp.user.model.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO retourné après une connexion réussie.
 * Contient le JWT et les informations de l'utilisateur connecté.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Réponse d'authentification avec JWT")
public class AuthResponse {

    @Schema(description = "Token JWT à inclure dans le header Authorization: Bearer <token>")
    private String token;

    @Builder.Default
    @Schema(example = "Bearer")
    private String type = "Bearer";

    @Schema(description = "ID MongoDB de l'utilisateur")
    private String userId;

    private String email;
    private String nom;
    private String prenom;
    private Role role;

    @Schema(description = "Durée de validité du token en millisecondes", example = "86400000")
    private long expiresIn;
}
