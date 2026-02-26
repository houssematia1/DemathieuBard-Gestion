package com.btp.controle.controller;

import com.btp.controle.dto.*;
import com.btp.controle.service.ControleService;
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
@RequestMapping("/api/controles")
@RequiredArgsConstructor
@Tag(name = "Contrôles", description = "Workflow de contrôle et visa des plans")
@SecurityRequirement(name = "bearerAuth")
public class ControleController {

    private final ControleService controleService;

    @PostMapping
    @Operation(summary = "Créer un contrôle")
    public ResponseEntity<ControleDto> create(
            @Valid @RequestBody CreateControleRequest request,
            Authentication auth) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(controleService.create(request, auth.getName()));
    }

    @GetMapping
    @Operation(summary = "Lister les contrôles d'un plan")
    public ResponseEntity<Page<ControleDto>> findByPlan(
            @RequestParam String planId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(controleService.findByPlan(planId,
                PageRequest.of(page, size, Sort.by("dateControle").descending())));
    }

    @GetMapping("/en-attente")
    @Operation(summary = "Contrôles en attente pour un contrôleur")
    public ResponseEntity<List<ControleDto>> findEnAttente(
            @RequestParam(required = false) String controleurId,
            Authentication auth) {
        String id = controleurId != null ? controleurId : auth.getName();
        return ResponseEntity.ok(controleService.findEnAttente(id));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Détail d'un contrôle")
    public ResponseEntity<ControleDto> findById(@PathVariable String id) {
        return ResponseEntity.ok(controleService.findById(id));
    }

    @PutMapping("/{id}/decision")
    @Operation(summary = "Valider / Rejeter / Demander modification")
    public ResponseEntity<ControleDto> applyDecision(
            @PathVariable String id,
            @Valid @RequestBody DecisionRequest request,
            Authentication auth) {
        return ResponseEntity.ok(controleService.applyDecision(id, request, auth.getName()));
    }

    @PostMapping("/{id}/commentaires")
    @Operation(summary = "Ajouter un commentaire")
    public ResponseEntity<ControleDto> addCommentaire(
            @PathVariable String id,
            @Valid @RequestBody CommentaireRequest request,
            Authentication auth) {
        return ResponseEntity.ok(controleService.addCommentaire(id, request, auth.getName()));
    }

    @PostMapping("/{id}/visa")
    @Operation(summary = "Appliquer le visa (validation finale)")
    public ResponseEntity<ControleDto> applyVisa(@PathVariable String id, Authentication auth) {
        return ResponseEntity.ok(controleService.applyVisa(id, auth.getName()));
    }
}
