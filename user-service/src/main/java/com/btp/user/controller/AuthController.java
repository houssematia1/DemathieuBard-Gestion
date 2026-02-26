package com.btp.user.controller;

import com.btp.user.dto.AuthResponse;
import com.btp.user.dto.LoginRequest;
import com.btp.user.dto.RegisterRequest;
import com.btp.user.dto.UtilisateurDto;
import com.btp.user.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Endpoints publics d'authentification.
 * Aucun JWT requis pour ces routes.
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentification", description = "Inscription et connexion")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @Operation(summary = "Inscrire un nouvel utilisateur")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Utilisateur créé"),
            @ApiResponse(responseCode = "400", description = "Données invalides"),
            @ApiResponse(responseCode = "409", description = "Email déjà utilisé")
    })
    public ResponseEntity<UtilisateurDto> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(request));
    }

    @PostMapping("/login")
    @Operation(summary = "Se connecter et obtenir un JWT")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Connexion réussie, JWT retourné"),
            @ApiResponse(responseCode = "401", description = "Identifiants incorrects")
    })
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
