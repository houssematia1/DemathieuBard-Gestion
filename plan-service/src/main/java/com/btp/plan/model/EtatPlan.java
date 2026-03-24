package com.btp.plan.model;

/**
 * État de production d'un plan (du point de vue du chantier).
 * Distinct du StatutPlan qui gère le workflow de contrôle.
 *
 * NON_COMMENCE → EN_COURS → VISE_BPE
 *
 * Passage à VISE_BPE : automatique quand un contrôle de type VISA reçoit VSO ou VAC.
 */
public enum EtatPlan {
    NON_COMMENCE,
    EN_COURS,
    VISE_BPE
}
