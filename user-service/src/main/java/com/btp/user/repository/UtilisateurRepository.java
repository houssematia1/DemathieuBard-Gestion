package com.btp.user.repository;

import com.btp.user.model.Role;
import com.btp.user.model.Utilisateur;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

/**
 * Repository MongoDB pour les utilisateurs.
 */
public interface UtilisateurRepository extends MongoRepository<Utilisateur, String> {

    Optional<Utilisateur> findByEmail(String email);

    boolean existsByEmail(String email);

    Page<Utilisateur> findByActif(boolean actif, Pageable pageable);

    List<Utilisateur> findByRole(Role role);
}
