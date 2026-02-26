package com.btp.gateway.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.util.List;

/**
 * Filtre global JWT : intercepte toutes les requêtes et valide le token
 * avant de les router vers les microservices downstream.
 *
 * Si le token est valide, les informations utilisateur (userId, email, role)
 * sont propagées dans des headers X-User-* vers les services en aval.
 */
@Slf4j
@Component
public class JwtAuthFilter implements GlobalFilter, Ordered {

    @Value("${jwt.secret}")
    private String jwtSecret;

    /**
     * Endpoints publics ne nécessitant pas d'authentification.
     */
    private static final List<String> PUBLIC_PATHS = List.of(
            "/api/auth/login",
            "/api/auth/register",
            "/api/plans/files/"   // téléchargement de fichiers plans — accès public
    );

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path = exchange.getRequest().getPath().value();
        HttpMethod method = exchange.getRequest().getMethod();

        // Laisser passer les requêtes OPTIONS (preflight CORS)
        if (HttpMethod.OPTIONS.equals(method)) {
            return chain.filter(exchange);
        }

        // Laisser passer les endpoints publics sans vérification JWT
        if (isPublicPath(path)) {
            return chain.filter(exchange);
        }

        // Extraire le header Authorization
        String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            log.warn("Requête refusée — header Authorization manquant pour: {} {}", method, path);
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        String token = authHeader.substring(7);

        try {
            Claims claims = parseAndValidateToken(token);

            // Propager les informations utilisateur vers les services downstream
            var modifiedRequest = exchange.getRequest().mutate()
                    .header("X-User-Id", claims.getSubject())
                    .header("X-User-Email", String.valueOf(claims.get("email")))
                    .header("X-User-Role", String.valueOf(claims.get("role")))
                    .build();

            log.debug("JWT valide — userId={}, role={}, path={}", claims.getSubject(), claims.get("role"), path);

            return chain.filter(exchange.mutate().request(modifiedRequest).build());

        } catch (JwtException e) {
            log.error("Token JWT invalide: {} — path: {}", e.getMessage(), path);
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
    }

    /**
     * Vérifie si le chemin est public (pas de JWT requis).
     */
    private boolean isPublicPath(String path) {
        return PUBLIC_PATHS.stream().anyMatch(path::startsWith);
    }

    /**
     * Parse et valide le token JWT, retourne les claims si valide.
     *
     * @throws JwtException si le token est invalide ou expiré
     */
    private Claims parseAndValidateToken(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8)))
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    @Override
    public int getOrder() {
        // Priorité haute : ce filtre s'exécute avant tous les autres filtres Gateway
        return -100;
    }
}
