package com.btp.controle.dto;

import com.btp.controle.model.Commentaire;
import com.btp.controle.model.Decision;
import com.btp.controle.model.TypeControle;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ControleDto {
    private String id;
    private String planId;
    private String versionId;
    private TypeControle typeControle;
    private String controleurId;
    private LocalDateTime dateControle;
    private Decision decision;
    private String remarque;
    private List<Commentaire> commentaires;
}
