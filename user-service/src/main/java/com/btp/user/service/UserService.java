package com.btp.user.service;

import com.btp.user.dto.UpdateRoleRequest;
import com.btp.user.dto.UpdateUserRequest;
import com.btp.user.dto.UtilisateurDto;
import com.btp.user.exception.EmailAlreadyExistsException;
import com.btp.user.exception.ResourceNotFoundException;
import com.btp.user.model.Role;
import com.btp.user.model.Utilisateur;
import com.btp.user.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service de gestion des utilisateurs (CRUD + attribution de rôle).
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UtilisateurRepository utilisateurRepository;

    /**
     * Retourne tous les utilisateurs paginés, triés par date de création décroissante.
     */
    public Page<UtilisateurDto> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("dateCreation").descending());
        return utilisateurRepository.findAll(pageable).map(this::toDto);
    }

    /**
     * Retourne l'utilisateur correspondant à l'ID.
     *
     * @throws ResourceNotFoundException si l'ID n'existe pas
     */
    public UtilisateurDto findById(String id) {
        return toDto(getOrThrow(id));
    }

    /**
     * Retourne la liste des utilisateurs ayant un rôle donné.
     */
    public List<UtilisateurDto> findByRole(Role role) {
        return utilisateurRepository.findByRole(role)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Met à jour nom, prénom et email d'un utilisateur.
     * Vérifie que le nouvel email n'appartient pas à un autre compte.
     */
    public UtilisateurDto update(String id, UpdateUserRequest request) {
        Utilisateur utilisateur = getOrThrow(id);
        String emailNormalise = request.getEmail().toLowerCase().trim();

        // Vérifier que le nouvel email n'est pas déjà utilisé par un autre utilisateur
        utilisateurRepository.findByEmail(emailNormalise).ifPresent(existing -> {
            if (!existing.getId().equals(id)) {
                throw new EmailAlreadyExistsException("L'email '" + emailNormalise + "' est déjà utilisé");
            }
        });

        utilisateur.setNom(request.getNom().trim());
        utilisateur.setPrenom(request.getPrenom().trim());
        utilisateur.setEmail(emailNormalise);

        Utilisateur saved = utilisateurRepository.save(utilisateur);
        log.info("Utilisateur {} mis à jour (email: {})", id, saved.getEmail());
        return toDto(saved);
    }

    /**
     * Change le rôle d'un utilisateur (ADMIN uniquement).
     */
    public UtilisateurDto updateRole(String id, UpdateRoleRequest request) {
        Utilisateur utilisateur = getOrThrow(id);
        Role ancienRole = utilisateur.getRole();

        utilisateur.setRole(request.getRole());
        Utilisateur saved = utilisateurRepository.save(utilisateur);

        log.info("Rôle de l'utilisateur {} modifié: {} → {}", id, ancienRole, request.getRole());
        return toDto(saved);
    }

    /**
     * Désactive un utilisateur (soft delete).
     * L'utilisateur reste en base mais ne peut plus se connecter.
     */
    public void desactiver(String id) {
        Utilisateur utilisateur = getOrThrow(id);

        if (!utilisateur.isActif()) {
            log.warn("Tentative de désactivation d'un compte déjà inactif: {}", id);
            return;
        }

        utilisateur.setActif(false);
        utilisateurRepository.save(utilisateur);
        log.info("Utilisateur {} désactivé", id);
    }

    /**
     * Réactive un compte utilisateur.
     */
    public UtilisateurDto reactiver(String id) {
        Utilisateur utilisateur = getOrThrow(id);
        utilisateur.setActif(true);
        Utilisateur saved = utilisateurRepository.save(utilisateur);
        log.info("Utilisateur {} réactivé", id);
        return toDto(saved);
    }

    // ── Helpers ──────────────────────────────────────────────────────────────

    private Utilisateur getOrThrow(String id) {
        return utilisateurRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable avec l'ID: " + id));
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
