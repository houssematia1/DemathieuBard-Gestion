package com.btp.user.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * Entité MongoDB représentant un utilisateur du système BTP.
 * Collection : utilisateurs (DB : btp_user)
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "utilisateurs")
public class Utilisateur {

    @Id
    private String id;

    private String nom;

    private String prenom;

    /** Email unique — sert d'identifiant de connexion */
    @Indexed(unique = true)
    private String email;

    /** Mot de passe hashé BCrypt — jamais exposé via DTO */
    private String motDePasse;

    private Role role;

    /** Soft delete : false = désactivé (ne peut plus se connecter) */
    @Builder.Default
    private boolean actif = true;

    private LocalDateTime dateCreation;
}
