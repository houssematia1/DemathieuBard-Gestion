package com.btp.affaire.controller;

import com.btp.affaire.dto.AffaireDto;
import com.btp.affaire.dto.ConfigAffaireRequest;
import com.btp.affaire.dto.CreateAffaireRequest;
import com.btp.affaire.dto.UpdateAffaireRequest;
import com.btp.affaire.model.HistoriqueEntry;
import com.btp.affaire.service.AffaireService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/affaires")
@RequiredArgsConstructor
@Tag(name = "Affaires", description = "Gestion des affaires BTP")
@SecurityRequirement(name = "bearerAuth")
public class AffaireController {

    private final AffaireService affaireService;

    @PostMapping
    @Operation(summary = "Créer une affaire")
    public ResponseEntity<AffaireDto> create(
            @Valid @RequestBody CreateAffaireRequest request,
            Authentication auth) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(affaireService.create(request, auth.getName()));
    }

    @GetMapping
    @Operation(summary = "Lister toutes les affaires (paginé)")
    public ResponseEntity<Page<AffaireDto>> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(affaireService.findAll(
                PageRequest.of(page, size, Sort.by("dateCreation").descending())));
    }

    @GetMapping("/search")
    @Operation(summary = "Rechercher des affaires par nom et/ou statut")
    public ResponseEntity<Page<AffaireDto>> search(
            @RequestParam(required = false) String nom,
            @RequestParam(required = false) String statut,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(affaireService.search(nom, statut,
                PageRequest.of(page, size, Sort.by("dateCreation").descending())));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Détail d'une affaire")
    public ResponseEntity<AffaireDto> findById(@PathVariable String id) {
        return ResponseEntity.ok(affaireService.findById(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Modifier une affaire")
    public ResponseEntity<AffaireDto> update(
            @PathVariable String id,
            @Valid @RequestBody UpdateAffaireRequest request,
            Authentication auth) {
        return ResponseEntity.ok(affaireService.update(id, request, auth.getName()));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer (annuler) une affaire")
    public ResponseEntity<Void> delete(@PathVariable String id, Authentication auth) {
        affaireService.delete(id, auth.getName());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/config")
    @Operation(summary = "Configurer les tableaux d'avancement (pourcentages par état, coefficients par type)")
    public ResponseEntity<AffaireDto> updateConfig(
            @PathVariable String id,
            @RequestBody ConfigAffaireRequest request,
            Authentication auth) {
        return ResponseEntity.ok(affaireService.updateConfig(id, request, auth.getName()));
    }

    @GetMapping("/{id}/historique")
    @Operation(summary = "Historique des modifications d'une affaire")
    public ResponseEntity<List<HistoriqueEntry>> getHistorique(@PathVariable String id) {
        return ResponseEntity.ok(affaireService.getHistorique(id));
    }
}
