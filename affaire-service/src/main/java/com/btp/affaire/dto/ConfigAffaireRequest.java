package com.btp.affaire.dto;

import lombok.Data;

import java.util.Map;

/**
 * Requête pour configurer les tableaux de pondération d'une affaire.
 */
@Data
public class ConfigAffaireRequest {
    private Map<String, Integer> pourcentagesParEtat;   // null = garder l'existant
    private Map<String, Integer> coefficientsParType;   // null = garder l'existant
    private Double avancement;                          // mise à jour manuelle optionnelle
}
