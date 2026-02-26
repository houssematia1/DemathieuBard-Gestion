package com.btp.user.dto;

import com.btp.user.model.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * DTO pour le changement de rôle d'un utilisateur (ADMIN uniquement).
 */
@Data
@Schema(description = "Nouveau rôle à attribuer à l'utilisateur")
public class UpdateRoleRequest {

    @NotNull(message = "Le rôle est obligatoire")
    @Schema(example = "CONTROLEUR_INTERNE")
    private Role role;
}
