package com.btp.affaire.dto;

import com.btp.affaire.model.StatutAffaire;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateAffaireRequest {
    @NotBlank(message = "Le nom est obligatoire")
    private String nom;

    private String description;
    private String client;
    private String localisation;
    private String chefProjetId;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private StatutAffaire statut;
}
