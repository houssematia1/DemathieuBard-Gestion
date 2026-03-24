package com.btp.plan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

/**
 * Point d'entrée du service Plan.
 * Gère le cycle de vie des plans d'exécution (création, émission, visa).
 * Port par défaut : 8082
 */
@SpringBootApplication
@EnableDiscoveryClient
@EnableMongoAuditing
public class PlanServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(PlanServiceApplication.class, args);
    }
}
