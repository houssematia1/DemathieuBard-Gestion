package com.btp.plan.model;

/**
 * Niveaux/zones d'un bâtiment selon la nomenclature BTP (CLAUDE-METIER.md section 2).
 * Utilisé dans la nomenclature : [Réf Affaire]-[Lot]-[Type]-[Niveau]-[N°]
 */
public enum NiveauPlan {
    FND,  // Fondations
    SS2,  // Sous-sol 2
    SS1,  // Sous-sol 1
    RDC,  // Rez-de-chaussée
    ETG1, // Étage 1
    ETG2, // Étage 2
    ETG3, // Étage 3
    ETG4, // Étage 4
    ETG5, // Étage 5
    TER,  // Terrasse / Toiture
    GEN   // Général (pas de niveau spécifique)
}
