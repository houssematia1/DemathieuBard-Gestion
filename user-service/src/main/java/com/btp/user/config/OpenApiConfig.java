package com.btp.user.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration Swagger / OpenAPI 3.
 * Interface disponible sur : http://localhost:8084/swagger-ui.html
 */
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("User Service API — BTP")
                        .description("Service de gestion des utilisateurs et d'authentification JWT.\n\n" +
                                "**Compte admin par défaut** : `admin@btp.fr` / `Admin@123`")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Équipe PFE BTP")
                                .email("pfe@btp.fr")))
                // Schéma de sécurité JWT pour tester les endpoints protégés depuis Swagger
                .addSecurityItem(new SecurityRequirement().addList("Bearer Auth"))
                .components(new Components()
                        .addSecuritySchemes("Bearer Auth",
                                new SecurityScheme()
                                        .name("Bearer Auth")
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                                        .description("Saisir le token JWT obtenu via POST /api/auth/login")));
    }
}
