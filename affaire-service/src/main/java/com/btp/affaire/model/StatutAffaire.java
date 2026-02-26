package com.btp.affaire.model;

/**
 * Statuts du cycle de vie d'une affaire BTP (CLAUDE-METIER.md §1).
 * CREATION → EN_PREPARATION → EN_COURS → EN_ARRET (temporaire) → TERMINEE
 *                                 ↓
 *                             ANNULEE (cas exceptionnel)
 */
public enum StatutAffaire {
    EN_PREPARATION, // L'affaire est créée, on prépare les documents, pas encore de travaux
    EN_COURS,       // Les travaux sont lancés, les plans sont en production
    EN_ARRET,       // Chantier arrêté temporairement (financier, météo, administratif)
    TERMINEE,       // Tous les plans sont visés, les travaux sont finis
    ANNULEE         // L'affaire est abandonnée définitivement
}
