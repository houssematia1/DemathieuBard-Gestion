package com.btp.plan.dto;

import com.btp.plan.model.HistoriqueEntry;
import com.btp.plan.model.NiveauPlan;
import com.btp.plan.model.StatutPlan;
import com.btp.plan.model.TypePlan;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class PlanDto {
    private String id;
    private String affaireId;
    private String nom;
    private TypePlan typePlan;
    private NiveauPlan niveau;
    private String lot;
    private String projeteurId;
    private String emetteurId;
    private StatutPlan statut;
    private LocalDateTime dateCreation;
    private String creePar;
    private List<VersionDto> versions;
    private VersionDto derniereVersion;
    private List<HistoriqueEntry> historique;
}
