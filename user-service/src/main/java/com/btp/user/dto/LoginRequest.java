package com.btp.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * DTO pour la connexion d'un utilisateur.
 */
@Data
@Schema(description = "Identifiants de connexion")
public class LoginRequest {

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "Format email invalide")
    @Schema(example = "admin@btp.fr")
    private String email;

    @NotBlank(message = "Le mot de passe est obligatoire")
    @Schema(example = "Admin@123")
    private String motDePasse;
}
