package com.btp.user.config;

import com.btp.user.model.Role;
import com.btp.user.model.Utilisateur;
import com.btp.user.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

/**
 * Initialise les données de base au démarrage de l'application.
 * Crée un compte ADMIN par défaut si aucun n'existe.
 *
 * Compte admin : admin@btp.fr / Admin@123
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements ApplicationRunner {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) {
        try {
            creerAdminParDefaut();
            creerUtilisateursDemo();
        } catch (Exception e) {
            log.warn(">>> DataInitializer : impossible d'initialiser les données au démarrage. " +
                     "MongoDB n'est peut-être pas encore prêt. " +
                     "Les données seront créées au prochain redémarrage. Erreur : {}", e.getMessage());
        }
    }

    private void creerAdminParDefaut() {
        if (!utilisateurRepository.existsByEmail("admin@btp.fr")) {
            Utilisateur admin = Utilisateur.builder()
                    .nom("Administrateur")
                    .prenom("Système")
                    .email("admin@btp.fr")
                    .motDePasse(passwordEncoder.encode("Admin@123"))
                    .role(Role.ADMIN)
                    .actif(true)
                    .dateCreation(LocalDateTime.now())
                    .build();
            utilisateurRepository.save(admin);
            log.info(">>> Compte ADMIN créé : admin@btp.fr / Admin@123");
        }
    }

    /**
     * Crée des utilisateurs de démonstration pour faciliter les tests.
     */
    private void creerUtilisateursDemo() {
        creerSiAbsent("chef.projet@btp.fr", "Martin", "Sophie", Role.CHEF_PROJET);
        creerSiAbsent("projeteur@btp.fr", "Bernard", "Lucas", Role.PROJETEUR);
        creerSiAbsent("emetteur@btp.fr", "Leblanc", "Emma", Role.EMETTEUR);
        creerSiAbsent("controleur.interne@btp.fr", "Moreau", "Pierre", Role.CONTROLEUR_INTERNE);
        creerSiAbsent("controleur.externe@btp.fr", "Petit", "Marie", Role.CONTROLEUR_EXTERNE);
        creerSiAbsent("responsable.visa@btp.fr", "Durand", "Antoine", Role.RESPONSABLE_VISA);
    }

    private void creerSiAbsent(String email, String nom, String prenom, Role role) {
        if (!utilisateurRepository.existsByEmail(email)) {
            Utilisateur u = Utilisateur.builder()
                    .nom(nom)
                    .prenom(prenom)
                    .email(email)
                    .motDePasse(passwordEncoder.encode("Demo@1234"))
                    .role(role)
                    .actif(true)
                    .dateCreation(LocalDateTime.now())
                    .build();
            utilisateurRepository.save(u);
            log.info(">>> Utilisateur demo créé: {} [{}]", email, role);
        }
    }
}