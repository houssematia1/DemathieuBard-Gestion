package com.btp.user.security;

import com.btp.user.model.Utilisateur;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * Utilitaire JWT : génération et validation des tokens.
 * Le secret doit être identique à celui configuré dans l'api-gateway.
 */
@Slf4j
@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expirationMs;

    /**
     * Génère un JWT signé contenant les informations de l'utilisateur.
     * Claims : sub=userId, email, role, nom, prenom
     */
    public String generateToken(Utilisateur user) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
                .subject(user.getId())
                .claim("email", user.getEmail())
                .claim("role", user.getRole().name())
                .claim("nom", user.getNom())
                .claim("prenom", user.getPrenom())
                .issuedAt(now)
                .expiration(expiry)
                .signWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)))
                .compact();
    }

    /**
     * Parse et valide le token. Lance JwtException si invalide ou expiré.
     */
    public Claims validateAndExtract(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)))
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Retourne true si le token est valide, false sinon.
     */
    public boolean isTokenValid(String token) {
        try {
            validateAndExtract(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            log.debug("Token JWT invalide: {}", e.getMessage());
            return false;
        }
    }

    public long getExpirationMs() {
        return expirationMs;
    }
}
