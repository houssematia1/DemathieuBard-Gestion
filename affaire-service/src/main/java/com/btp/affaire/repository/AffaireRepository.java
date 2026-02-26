package com.btp.affaire.repository;

import com.btp.affaire.model.Affaire;
import com.btp.affaire.model.StatutAffaire;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AffaireRepository extends MongoRepository<Affaire, String> {
    boolean existsByReference(String reference);
    Optional<Affaire> findByReference(String reference);
    Page<Affaire> findByNomContainingIgnoreCase(String nom, Pageable pageable);
    Page<Affaire> findByStatut(StatutAffaire statut, Pageable pageable);
    Page<Affaire> findByNomContainingIgnoreCaseAndStatut(String nom, StatutAffaire statut, Pageable pageable);
}
