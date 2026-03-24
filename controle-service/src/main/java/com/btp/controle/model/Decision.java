package com.btp.controle.model;

/**
 * Avis du contrôleur — s'applique à tous les types de contrôle.
 *
 * VSO : Visa Sans Observation  — approuvé, aucune correction requise
 * VAC : Visa Avec Commentaire  — approuvé sous réserve, commentaires mineurs
 * VAO : Visa Avec Observation  — refusé, corrections majeures requises (remarque obligatoire)
 * Pour les contrôles de type VISA : VSO/VAC → plan VISE_BPE
 */
public enum Decision {
    EN_ATTENTE,  // En attente de l'avis du contrôleur
    VSO,         // Visa Sans Observation — approuvé sans réserve
    VAC,         // Visa Avec Commentaire — approuvé avec commentaires mineurs
    VAO          // Visa Avec Observation — corrections majeures requises
}
