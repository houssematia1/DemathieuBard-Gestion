package com.btp.user.dto;

import com.btp.user.model.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * DTO pour l'inscription d'un nouvel utilisateur.
 */
@Data
@Schema(description = "Données pour l'inscription d'un utilisateur")
public class RegisterRequest {

    @NotBlank(message = "Le nom est obligatoire")
    @Schema(example = "Dupont")
    private String nom;

    @NotBlank(message = "Le prénom est obligatoire")
    @Schema(example = "Jean")
    private String prenom;

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "Format email invalide")
    @Schema(example = "jean.dupont@btp.fr")
    private String email;

    @NotBlank(message = "Le mot de passe est obligatoire")
    @Size(min = 8, message = "Le mot de passe doit contenir au moins 8 caractères")
    @Schema(example = "MotDePasse@123")
    private String motDePasse;

    @Schema(description = "Rôle attribué (PROJETEUR par défaut)", example = "PROJETEUR")
    private Role role;
}
