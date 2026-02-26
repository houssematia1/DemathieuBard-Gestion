package com.btp.notification.controller;

import com.btp.notification.dto.NotificationDto;
import com.btp.notification.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@Tag(name = "Notifications", description = "Gestion des notifications in-app")
@SecurityRequirement(name = "bearerAuth")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    @Operation(summary = "Lister les notifications de l'utilisateur connecté")
    public ResponseEntity<Page<NotificationDto>> findAll(
            Authentication auth,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(notificationService.findByUser(auth.getName(),
                PageRequest.of(page, size, Sort.by("dateEnvoi").descending())));
    }

    @GetMapping("/non-lues")
    @Operation(summary = "Notifications non lues")
    public ResponseEntity<List<NotificationDto>> findNonLues(Authentication auth) {
        return ResponseEntity.ok(notificationService.findNonLues(auth.getName()));
    }

    @GetMapping("/count")
    @Operation(summary = "Nombre de notifications non lues")
    public ResponseEntity<Map<String, Long>> countNonLues(Authentication auth) {
        return ResponseEntity.ok(Map.of("count", notificationService.countNonLues(auth.getName())));
    }

    @PutMapping("/{id}/lue")
    @Operation(summary = "Marquer une notification comme lue")
    public ResponseEntity<NotificationDto> markAsRead(@PathVariable String id) {
        return ResponseEntity.ok(notificationService.markAsRead(id));
    }

    @PutMapping("/tout-lire")
    @Operation(summary = "Marquer toutes les notifications comme lues")
    public ResponseEntity<Void> markAllAsRead(Authentication auth) {
        notificationService.markAllAsRead(auth.getName());
        return ResponseEntity.noContent().build();
    }
}
