package com.btp.controle.model;

/**
 * Décisions du workflow de contrôle BTP (CLAUDE-METIER.md §3 & §5).
 *
 * Contrôle INTERNE : BPE | BAO | A_MODIFIER
 * Contrôle EXTERNE : FAVORABLE | DEFAVORABLE
 */
public enum Decision {
    EN_ATTENTE,    // En attente de la décision du contrôleur

    // ── Contrôle INTERNE ─────────────────────────────────
    BPE,           // Bon Pour Exécution — contrôle interne OK, passe à l'étape suivante
    BAO,           // Bon Avec Observations — OK mais remarques mineures à corriger
    A_MODIFIER,    // Refusé — corrections majeures nécessaires, retour au projeteur

    // ── Contrôle EXTERNE ─────────────────────────────────
    FAVORABLE,     // Contrôle externe OK — peut aller au visa
    DEFAVORABLE    // Contrôle externe refusé — retour au projeteur (nouvel indice)
}
