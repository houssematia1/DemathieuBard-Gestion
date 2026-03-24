package com.btp.plan.model;

/**
 * Statut technique du plan dans le workflow de contrôle.
 * Distinct de EtatPlan (NON_COMMENCE / EN_COURS / VISE_BPE) qui représente
 * l'état du point de vue de la production chantier.
 *
 * BROUILLON → EMIS → EN_CONTROLE_* → (VSO/VAC → EMIS) | (VAO → BROUILLON) → VISE
 */
public enum StatutPlan {
    BROUILLON,             // Plan en cours de rédaction
    EMIS,                  // Émis officiellement (indice A, B, C…)
    EN_CONTROLE_INTERNE,   // Soumis au contrôle interne
    EN_CONTROLE_EXTERNE,   // Soumis au contrôle externe
    EN_CONTROLE_TECHNIQUE, // Soumis au contrôle technique
    VISE                   // Visa accordé (contrôle VISA + VSO/VAC)
}
