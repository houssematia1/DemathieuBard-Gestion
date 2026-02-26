package com.btp.plan.model;

/**
 * Types de plans BTP selon CLAUDE-METIER.md section 2.
 */
public enum TypePlan {
    COF,   // Coffrage — forme et dimensions des éléments béton
    FER,   // Ferraillage — armatures acier
    NCAL,  // Note de calcul — calcul structurel
    EXE,   // Exécution — plan final prêt pour chantier
    SYN,   // Synthèse — superposition tous les plans
    FND,   // Fondation — semelles, pieux, radier
    ARCH   // Architecture — façades, coupes, aménagement
}
