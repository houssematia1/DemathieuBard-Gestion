package com.btp.user.dto;

import com.btp.user.model.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO de lecture pour un utilisateur.
 * Ne contient jamais le mot de passe.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Informations d'un utilisateur (sans mot de passe)")
public class UtilisateurDto {

    private String id;
    private String nom;
    private String prenom;
    private String email;
    private Role role;
    private boolean actif;
    private LocalDateTime dateCreation;
}
