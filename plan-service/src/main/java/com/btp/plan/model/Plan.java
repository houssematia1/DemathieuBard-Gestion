package com.btp.plan.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "plans")
public class Plan {

    @Id
    private String id;

    private String affaireId;
    private String nom;
    private TypePlan typePlan;
    private NiveauPlan niveau;    // Zone/niveau du bâtiment (RDC, ETG1, SS1...)
    private String lot;           // Lot de l'affaire (ex: GC, CHARP, ELEC)
    private String projeteurId;   // userId du projeteur
    private String emetteurId;    // userId de l'émetteur

    @Builder.Default
    private StatutPlan statut = StatutPlan.BROUILLON;

    @CreatedDate
    private LocalDateTime dateCreation;

    private String creePar; // userId créateur

    @Builder.Default
    private List<Version> versions = new ArrayList<>();

    @Builder.Default
    private List<HistoriqueEntry> historique = new ArrayList<>();
}
