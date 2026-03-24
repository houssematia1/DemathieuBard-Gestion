package com.btp.plan.dto;

import com.btp.plan.model.NiveauPlan;
import com.btp.plan.model.TypePrestation;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdatePlanRequest {
    private String nom;
    private TypePrestation typePrestation;
    private NiveauPlan niveau;
    private String lot;
    private String auteur;
    private String projeteurId;
    private Integer nombrePlanches;
    private LocalDate dateEngagement;
}
