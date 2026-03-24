package com.btp.affaire;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

/**
 * Point d'entrée du service Affaire.
 * Gère le cycle de vie des affaires BTP (création, suivi, clôture).
 * Port par défaut : 8081
 */
@SpringBootApplication
@EnableDiscoveryClient
@EnableMongoAuditing
public class AffaireServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(AffaireServiceApplication.class, args);
    }
}
