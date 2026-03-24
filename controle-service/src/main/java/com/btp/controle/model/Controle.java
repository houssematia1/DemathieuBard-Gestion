package com.btp.controle.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "controles")
public class Controle {

    @Id
    private String id;

    @Indexed(unique = true, sparse = true)
    private String reference;          // Référence unique du contrôle (ex: CTRL-001)

    private String planId;
    private String versionId;
    private String indiceExterneImpacte; // Indice externe du plan au moment du contrôle
    private TypeControle typeControle;
    private String controleurId;        // Utilisateur ayant effectué le contrôle
    private String projeteurId;         // Projeteur du plan (pour les notifications)

    @CreatedDate
    private LocalDateTime dateControle;

    @Builder.Default
    private Decision decision = Decision.EN_ATTENTE;

    private String remarque;            // Obligatoire pour VAO
    private String fichierPDF;          // URL du rapport de contrôle (PDF)

    @Builder.Default
    private List<Commentaire> commentaires = new ArrayList<>();
}
