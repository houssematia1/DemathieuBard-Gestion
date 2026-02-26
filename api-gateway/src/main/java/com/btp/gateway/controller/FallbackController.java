package com.btp.gateway.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Contrôleur de fallback pour les Circuit Breakers.
 * Retourne une réponse 503 quand un microservice est indisponible.
 */
@RestController
@RequestMapping("/fallback")
public class FallbackController {

    @GetMapping("/affaire")
    public ResponseEntity<Map<String, String>> affaireFallback() {
        return buildFallbackResponse("Affaire Service");
    }

    @GetMapping("/plan")
    public ResponseEntity<Map<String, String>> planFallback() {
        return buildFallbackResponse("Plan Service");
    }

    @GetMapping("/controle")
    public ResponseEntity<Map<String, String>> controleFallback() {
        return buildFallbackResponse("Controle Service");
    }

    @GetMapping("/user")
    public ResponseEntity<Map<String, String>> userFallback() {
        return buildFallbackResponse("User Service");
    }

    @GetMapping("/notification")
    public ResponseEntity<Map<String, String>> notificationFallback() {
        return buildFallbackResponse("Notification Service");
    }

    private ResponseEntity<Map<String, String>> buildFallbackResponse(String serviceName) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(Map.of(
                "statut", "ERREUR",
                "message", serviceName + " est temporairement indisponible. Veuillez réessayer dans quelques instants.",
                "code", "SERVICE_UNAVAILABLE"
        ));
    }
}
