package com.btp.user.service;

import com.btp.user.dto.LoginRequest;
import com.btp.user.dto.RegisterRequest;
import com.btp.user.dto.UtilisateurDto;
import com.btp.user.exception.EmailAlreadyExistsException;
import com.btp.user.model.Role;
import com.btp.user.model.Utilisateur;
import com.btp.user.repository.UtilisateurRepository;
import com.btp.user.security.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UtilisateurRepository utilisateurRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    private Utilisateur utilisateurActif;

    @BeforeEach
    void setUp() {
        utilisateurActif = Utilisateur.builder()
                .id("user-123")
                .nom("Dupont")
                .prenom("Jean")
                .email("jean.dupont@btp.fr")
                .motDePasse("$2a$10$hashedPassword")
                .role(Role.PROJETEUR)
                .actif(true)
                .dateCreation(LocalDateTime.now())
                .build();
    }

    @Test
    void register_shouldCreateUser_whenEmailIsNew() {
        // Arrange
        RegisterRequest request = new RegisterRequest();
        request.setNom("Dupont");
        request.setPrenom("Jean");
        request.setEmail("jean.dupont@btp.fr");
        request.setMotDePasse("MotDePasse@123");
        request.setRole(Role.PROJETEUR);

        when(utilisateurRepository.existsByEmail("jean.dupont@btp.fr")).thenReturn(false);
        when(passwordEncoder.encode(any())).thenReturn("$2a$10$hashedPassword");
        when(utilisateurRepository.save(any())).thenReturn(utilisateurActif);

        // Act
        UtilisateurDto result = authService.register(request);

        // Assert
        assertThat(result.getEmail()).isEqualTo("jean.dupont@btp.fr");
        assertThat(result.getRole()).isEqualTo(Role.PROJETEUR);
        verify(utilisateurRepository).save(any(Utilisateur.class));
    }

    @Test
    void register_shouldThrow_whenEmailAlreadyExists() {
        // Arrange
        RegisterRequest request = new RegisterRequest();
        request.setEmail("jean.dupont@btp.fr");
        request.setNom("X");
        request.setPrenom("X");
        request.setMotDePasse("MotDePasse@123");

        when(utilisateurRepository.existsByEmail("jean.dupont@btp.fr")).thenReturn(true);

        // Act & Assert
        assertThatThrownBy(() -> authService.register(request))
                .isInstanceOf(EmailAlreadyExistsException.class);

        verify(utilisateurRepository, never()).save(any());
    }

    @Test
    void login_shouldReturnToken_whenCredentialsValid() {
        // Arrange
        LoginRequest request = new LoginRequest();
        request.setEmail("jean.dupont@btp.fr");
        request.setMotDePasse("MotDePasse@123");

        when(utilisateurRepository.findByEmail("jean.dupont@btp.fr"))
                .thenReturn(Optional.of(utilisateurActif));
        when(passwordEncoder.matches("MotDePasse@123", utilisateurActif.getMotDePasse()))
                .thenReturn(true);
        when(jwtUtil.generateToken(utilisateurActif)).thenReturn("jwt-token-mock");
        when(jwtUtil.getExpirationMs()).thenReturn(86400000L);

        // Act
        var response = authService.login(request);

        // Assert
        assertThat(response.getToken()).isEqualTo("jwt-token-mock");
        assertThat(response.getEmail()).isEqualTo("jean.dupont@btp.fr");
    }

    @Test
    void login_shouldThrow_whenPasswordInvalid() {
        // Arrange
        LoginRequest request = new LoginRequest();
        request.setEmail("jean.dupont@btp.fr");
        request.setMotDePasse("MauvaisMotDePasse");

        when(utilisateurRepository.findByEmail("jean.dupont@btp.fr"))
                .thenReturn(Optional.of(utilisateurActif));
        when(passwordEncoder.matches("MauvaisMotDePasse", utilisateurActif.getMotDePasse()))
                .thenReturn(false);

        // Act & Assert
        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(BadCredentialsException.class);
    }

    @Test
    void login_shouldThrow_whenAccountInactive() {
        // Arrange
        utilisateurActif.setActif(false);
        LoginRequest request = new LoginRequest();
        request.setEmail("jean.dupont@btp.fr");
        request.setMotDePasse("MotDePasse@123");

        when(utilisateurRepository.findByEmail("jean.dupont@btp.fr"))
                .thenReturn(Optional.of(utilisateurActif));

        // Act & Assert
        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(BadCredentialsException.class)
                .hasMessageContaining("désactivé");
    }
}
