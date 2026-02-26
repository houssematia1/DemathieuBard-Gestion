package com.btp.plan.controller;

import com.btp.plan.dto.AddVersionRequest;
import com.btp.plan.dto.CreatePlanRequest;
import com.btp.plan.dto.PlanDto;
import com.btp.plan.dto.VersionDto;
import com.btp.plan.service.PlanService;
import java.util.Map;
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
@RequestMapping("/api/plans")
@RequiredArgsConstructor
@Tag(name = "Plans", description = "Gestion des plans avec versioning")
@SecurityRequirement(name = "bearerAuth")
public class PlanController {

    private final PlanService planService;

    @PostMapping
    @Operation(summary = "Créer un plan (version initiale A)")
    public ResponseEntity<PlanDto> create(
            @Valid @RequestBody CreatePlanRequest request,
            Authentication auth) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(planService.create(request, auth.getName()));
    }

    @GetMapping
    @Operation(summary = "Lister les plans (filtres optionnels)")
    public ResponseEntity<Page<PlanDto>> findAll(
            @RequestParam(required = false) String affaireId,
            @RequestParam(required = false) String typePlan,
            @RequestParam(required = false) String statut,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by("dateCreation").descending());
        if (affaireId != null && !affaireId.isBlank()) {
            return ResponseEntity.ok(planService.findByAffaire(affaireId, pageable));
        }
        return ResponseEntity.ok(planService.search(typePlan, statut, pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Détail d'un plan avec ses versions")
    public ResponseEntity<PlanDto> findById(@PathVariable String id) {
        return ResponseEntity.ok(planService.findById(id));
    }

    @PostMapping("/{id}/versions")
    @Operation(summary = "Ajouter une nouvelle version (nouvel indice)")
    public ResponseEntity<PlanDto> addVersion(
            @PathVariable String id,
            @RequestBody AddVersionRequest request,
            Authentication auth) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(planService.addVersion(id, request, auth.getName()));
    }

    @GetMapping("/{id}/versions")
    @Operation(summary = "Lister les versions d'un plan")
    public ResponseEntity<List<VersionDto>> getVersions(@PathVariable String id) {
        return ResponseEntity.ok(planService.getVersions(id));
    }

    @PostMapping("/{id}/emettre")
    @Operation(summary = "Émettre un plan (BROUILLON → EMIS, assigne l'indice officiel)")
    public ResponseEntity<PlanDto> emettre(@PathVariable String id, Authentication auth) {
        return ResponseEntity.ok(planService.emettre(id, auth.getName()));
    }

    @PostMapping("/{id}/soumettre")
    @Operation(summary = "Soumettre un plan EMIS au contrôle interne (EMIS → EN_CONTROLE_INTERNE)")
    public ResponseEntity<PlanDto> soumettre(@PathVariable String id, Authentication auth) {
        return ResponseEntity.ok(planService.soumettre(id, auth.getName()));
    }

    @PostMapping("/{id}/statut")
    @Operation(summary = "Mettre à jour le statut d'un plan (appelé par controle-service)")
    public ResponseEntity<PlanDto> updateStatut(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {
        String statut = body.get("statut");
        if (statut == null || statut.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(planService.updateStatut(id, statut));
    }

    @GetMapping("/{id}/historique")
    @Operation(summary = "Historique complet d'un plan")
    public ResponseEntity<PlanDto> getHistorique(@PathVariable String id) {
        return ResponseEntity.ok(planService.findById(id));
    }
}
