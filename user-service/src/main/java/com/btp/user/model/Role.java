package com.btp.user.model;

/**
 * Rôles disponibles dans le système BTP.
 * Chaque rôle détermine les actions autorisées.
 */
public enum Role {

    /** Accès total — gestion des utilisateurs, configuration */
    ADMIN,

    /** Supervision globale des affaires et des plans */
    CHEF_PROJET,

    /** Création et soumission des plans */
    PROJETEUR,

    /** Émission officielle des plans vers les contrôleurs */
    EMETTEUR,

    /** Contrôle interne des plans (validation technique interne) */
    CONTROLEUR_INTERNE,

    /** Contrôle externe des plans (bureau de contrôle tiers) */
    CONTROLEUR_EXTERNE,

    /** Apposition du visa final sur les plans validés */
    RESPONSABLE_VISA
}
