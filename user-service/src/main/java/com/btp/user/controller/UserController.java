package com.btp.user.controller;

import com.btp.user.dto.UpdateRoleRequest;
import com.btp.user.dto.UpdateUserRequest;
import com.btp.user.dto.UtilisateurDto;
import com.btp.user.model.Role;
import com.btp.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Endpoints de gestion des utilisateurs.
 * Protégés par JWT (sauf /me qui exige seulement d'être authentifié).
 */
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "Utilisateurs", description = "CRUD utilisateurs et gestion des rôles")
@SecurityRequirement(name = "Bearer Auth")
public class UserController {

    private final UserService userService;

    /**
     * Lister tous les utilisateurs — ADMIN uniquement.
     * Sécurisé via SecurityConfig (hasRole ADMIN).
     */
    @GetMapping
    @Operation(summary = "Lister tous les utilisateurs (ADMIN)")
    public ResponseEntity<Page<UtilisateurDto>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(userService.findAll(page, size));
    }

    /**
     * Retourne le profil de l'utilisateur actuellement connecté.
     * L'ID est extrait du JWT via le principal Spring Security.
     */
    @GetMapping("/me")
    @Operation(summary = "Profil de l'utilisateur connecté")
    public ResponseEntity<UtilisateurDto> getMe(Authentication authentication) {
        String userId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(userService.findById(userId));
    }

    /**
     * Retourne les utilisateurs ayant un rôle spécifique.
     */
    @GetMapping("/role/{role}")
    @Operation(summary = "Utilisateurs par rôle")
    public ResponseEntity<List<UtilisateurDto>> getByRole(@PathVariable Role role) {
        return ResponseEntity.ok(userService.findByRole(role));
    }

    /**
     * Détail d'un utilisateur par ID.
     */
    @GetMapping("/{id}")
    @Operation(summary = "Détail d'un utilisateur")
    public ResponseEntity<UtilisateurDto> getById(@PathVariable String id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    /**
     * Modifier nom, prénom, email d'un utilisateur.
     * Autorisé pour : l'utilisateur lui-même OU un ADMIN.
     */
    @PutMapping("/{id}")
    @Operation(summary = "Modifier un utilisateur")
    public ResponseEntity<UtilisateurDto> update(
            @PathVariable String id,
            @Valid @RequestBody UpdateUserRequest request,
            Authentication authentication) {

        String currentUserId = (String) authentication.getPrincipal();
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin && !currentUserId.equals(id)) {
            throw new AccessDeniedException("Vous ne pouvez modifier que votre propre profil");
        }

        return ResponseEntity.ok(userService.update(id, request));
    }

    /**
     * Changer le rôle d'un utilisateur — ADMIN uniquement.
     * Sécurisé via SecurityConfig.
     */
    @PutMapping("/{id}/role")
    @Operation(summary = "Changer le rôle d'un utilisateur (ADMIN)")
    public ResponseEntity<UtilisateurDto> updateRole(
            @PathVariable String id,
            @Valid @RequestBody UpdateRoleRequest request) {
        return ResponseEntity.ok(userService.updateRole(id, request));
    }

    /**
     * Désactiver un utilisateur (soft delete) — ADMIN uniquement.
     * Sécurisé via SecurityConfig.
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Désactiver un utilisateur (ADMIN)")
    public ResponseEntity<Void> desactiver(@PathVariable String id) {
        userService.desactiver(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Réactiver un compte désactivé — ADMIN uniquement.
     */
    @PutMapping("/{id}/reactiver")
    @Operation(summary = "Réactiver un compte utilisateur (ADMIN)")
    public ResponseEntity<UtilisateurDto> reactiver(@PathVariable String id) {
        return ResponseEntity.ok(userService.reactiver(id));
    }
}
