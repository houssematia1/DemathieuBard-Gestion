package com.btp.controle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

/**
 * Point d'entrée du service Contrôle.
 * Gère les contrôles internes et externes des plans (BPE, BAO, FAVORABLE...).
 * Port par défaut : 8083
 */
@SpringBootApplication
@EnableDiscoveryClient
@EnableMongoAuditing
public class ControleServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ControleServiceApplication.class, args);
    }
}
