package com.btp.controle.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CommentaireRequest {
    @NotBlank(message = "Le contenu est obligatoire")
    private String contenu;
}
