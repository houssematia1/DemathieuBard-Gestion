package com.btp.plan.model;

/**
 * Statuts du workflow BTP selon CLAUDE-METIER.md.
 * BROUILLON → EMIS → EN_CONTROLE_INTERNE → BPE/BAO/A_MODIFIER
 *                   → EN_CONTROLE_EXTERNE → FAVORABLE/DEFAVORABLE → VISE
 */
public enum StatutPlan {
    // Phase 1 : création
    BROUILLON,

    // Phase 2 : émission officielle (indice A, B, C...)
    EMIS,

    // Phase 3 : contrôle interne
    EN_CONTROLE_INTERNE,
    BON_POUR_EXECUTION,      // BPE — contrôle interne OK
    BON_AVEC_OBSERVATIONS,   // BAO — OK avec remarques mineures
    A_MODIFIER,              // Rejeté, retour au projeteur

    // Phase 4 : contrôle externe
    EN_CONTROLE_EXTERNE,
    FAVORABLE,               // Contrôle externe OK
    DEFAVORABLE,             // Contrôle externe refusé, retour projeteur

    // Phase finale : visa
    VISE
}
