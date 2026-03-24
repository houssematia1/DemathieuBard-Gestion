package com.btp.plan.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/plans")
@Tag(name = "Fichiers Plans", description = "Upload et téléchargement de fichiers PDF de plans")
@Slf4j
public class FileUploadController {

    @Value("${upload.dir:/app/uploads}")
    private String uploadDir;

    /**
     * Upload d'un fichier PDF (ou autre) pour un plan ou une version.
     * Retourne l'URL relative pour accéder au fichier.
     */
    @PostMapping("/upload")
    @Operation(summary = "Uploader un fichier PDF pour un plan",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Map<String, String>> upload(
            @RequestParam("file") MultipartFile file) throws IOException {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Le fichier est vide"));
        }

        Path dir = Paths.get(uploadDir);
        if (!Files.exists(dir)) {
            Files.createDirectories(dir);
        }

        // Vérification extension acceptée
        String originalName = file.getOriginalFilename() != null
                ? file.getOriginalFilename()
                : "fichier";
        String ext = originalName.contains(".")
                ? originalName.substring(originalName.lastIndexOf('.')).toLowerCase()
                : "";
        java.util.Set<String> ALLOWED = java.util.Set.of(".pdf", ".doc", ".docx", ".xls", ".xlsx", ".dwg");
        if (!ext.isEmpty() && !ALLOWED.contains(ext)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Format non accepté. Formats autorisés : PDF, Word, Excel, DWG"));
        }
        String safeName = originalName.replaceAll("[^a-zA-Z0-9._-]", "_");
        String filename = UUID.randomUUID() + "_" + safeName;

        Path dest = dir.resolve(filename);
        file.transferTo(dest);

        log.info("Fichier uploadé : {} ({} octets)", filename, file.getSize());
        return ResponseEntity.ok(Map.of("fichierUrl", "/api/plans/files/" + filename));
    }

    /**
     * Téléchargement / affichage en ligne d'un fichier plan.
     * Accessible sans authentification pour permettre l'affichage direct dans le navigateur.
     */
    @GetMapping("/files/{filename:.+}")
    @Operation(summary = "Télécharger ou afficher un fichier plan")
    public ResponseEntity<Resource> download(@PathVariable String filename) throws MalformedURLException {
        Path filePath = Paths.get(uploadDir).resolve(filename).normalize();
        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists() || !resource.isReadable()) {
            log.warn("Fichier introuvable : {}", filename);
            return ResponseEntity.notFound().build();
        }

        String lower = filename.toLowerCase();
        String contentType;
        if (lower.endsWith(".pdf"))  contentType = "application/pdf";
        else if (lower.endsWith(".doc"))  contentType = "application/msword";
        else if (lower.endsWith(".docx")) contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        else if (lower.endsWith(".xls"))  contentType = "application/vnd.ms-excel";
        else if (lower.endsWith(".xlsx")) contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        else if (lower.endsWith(".dwg"))  contentType = "application/acad";
        else contentType = "application/octet-stream";

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }
}
