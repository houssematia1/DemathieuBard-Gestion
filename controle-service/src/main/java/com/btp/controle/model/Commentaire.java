package com.btp.controle.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Commentaire {
    private String auteurId;
    private String contenu;
    private LocalDateTime date;
}
