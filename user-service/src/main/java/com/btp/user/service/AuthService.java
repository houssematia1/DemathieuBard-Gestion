package com.btp.user.service;

import com.btp.user.dto.AuthResponse;
import com.btp.user.dto.LoginRequest;
import com.btp.user.dto.RegisterRequest;
import com.btp.user.dto.UtilisateurDto;
import com.btp.user.exception.EmailAlreadyExistsException;
import com.btp.user.model.Role;
import com.btp.user.model.Utilisateur;
import com.btp.user.repository.UtilisateurRepository;
import com.btp.user.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/**
 * Service d'authentification : inscription et connexion.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    /**
     * Inscrit un nouvel utilisateur.
     * L'email est normalisé en minuscules.
     * Le mot de passe est hashé avec BCrypt.
     *
     * @throws EmailAlreadyExistsException si l'email est déjà pris
     */
    public UtilisateurDto register(RegisterRequest request) {
        String emailNormalise = request.getEmail().toLowerCase().trim();

        if (utilisateurRepository.existsByEmail(emailNormalise)) {
            throw new EmailAlreadyExistsException("L'email '" + emailNormalise + "' est déjà utilisé");
        }

        Utilisateur utilisateur = Utilisateur.builder()
                .nom(request.getNom().trim())
                .prenom(request.getPrenom().trim())
                .email(emailNormalise)
                .motDePasse(passwordEncoder.encode(request.getMotDePasse()))
                .role(request.getRole() != null ? request.getRole() : Role.PROJETEUR)
                .actif(true)
                .dateCreation(LocalDateTime.now())
                .build();

        Utilisateur saved = utilisateurRepository.save(utilisateur);
        log.info("Nouvel utilisateur enregistré: {} [{}]", saved.getEmail(), saved.getRole());

        return toDto(saved);
    }

    /**
     * Authentifie un utilisateur et retourne un JWT.
     *
     * @throws BadCredentialsException si les identifiants sont incorrects ou le compte inactif
     */
    public AuthResponse login(LoginRequest request) {
        String emailNormalise = request.getEmail().toLowerCase().trim();

        Utilisateur utilisateur = utilisateurRepository.findByEmail(emailNormalise)
                .orElseThrow(() -> new BadCredentialsException("Email ou mot de passe incorrect"));

        if (!utilisateur.isActif()) {
            throw new BadCredentialsException("Ce compte a été désactivé. Contactez l'administrateur.");
        }

        if (!passwordEncoder.matches(request.getMotDePasse(), utilisateur.getMotDePasse())) {
            throw new BadCredentialsException("Email ou mot de passe incorrect");
        }

        String token = jwtUtil.generateToken(utilisateur);
        log.info("Connexion réussie: {} [{}]", utilisateur.getEmail(), utilisateur.getRole());

        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .userId(utilisateur.getId())
                .email(utilisateur.getEmail())
                .nom(utilisateur.getNom())
                .prenom(utilisateur.getPrenom())
                .role(utilisateur.getRole())
                .expiresIn(jwtUtil.getExpirationMs())
                .build();
    }

    private UtilisateurDto toDto(Utilisateur u) {
        return UtilisateurDto.builder()
                .id(u.getId())
                .nom(u.getNom())
                .prenom(u.getPrenom())
                .email(u.getEmail())
                .role(u.getRole())
                .actif(u.isActif())
                .dateCreation(u.getDateCreation())
                .build();
    }
}
