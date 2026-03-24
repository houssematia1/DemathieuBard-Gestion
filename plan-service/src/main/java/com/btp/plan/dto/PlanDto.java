package com.btp.plan.dto;

import com.btp.plan.model.*;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class PlanDto {
    private String id;
    private String numeroPlan;
    private String affaireId;
    private String nom;
    private TypePlan typePlan;
    private TypePrestation typePrestation;
    private NiveauPlan niveau;
    private String lot;
    private String auteur;
    private String projeteurId;
    private String emetteurId;
    private Integer nombrePlanches;
    private LocalDate dateEngagement;
    private String indiceInterne;
    private String indiceExterne;
    private StatutPlan statut;
    private EtatPlan etat;
    private boolean archived;
    private LocalDateTime dateCreation;
    private String creePar;
    private List<String> fichiers;
    private List<VersionDto> versions;
    private VersionDto derniereVersion;
    private List<HistoriqueEntry> historique;
}
