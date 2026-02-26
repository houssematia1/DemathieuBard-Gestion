package com.btp.affaire.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateAffaireRequest {
    @NotBlank(message = "Le nom est obligatoire")
    private String nom;

    private String description;
    private String client;       // Maître d'ouvrage
    private String localisation; // Ville / adresse du chantier
    private String chefProjetId; // userId du chef de projet

    @NotNull(message = "La date de début est obligatoire")
    private LocalDate dateDebut;

    private LocalDate dateFin;
}
