package com.btp.controle.model;

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
@Document(collection = "controles")
public class Controle {

    @Id
    private String id;

    private String planId;
    private String versionId;
    private TypeControle typeControle;
    private String controleurId;

    @CreatedDate
    private LocalDateTime dateControle;

    @Builder.Default
    private Decision decision = Decision.EN_ATTENTE;

    private String remarque;

    @Builder.Default
    private List<Commentaire> commentaires = new ArrayList<>();
}
