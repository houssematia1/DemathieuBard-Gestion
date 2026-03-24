package com.btp.notification;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

/**
 * Point d'entrée du service Notification.
 * Envoie des notifications (email, in-app) via RabbitMQ lors des événements métier.
 * Port par défaut : 8085
 */
@SpringBootApplication
@EnableDiscoveryClient
@EnableMongoAuditing
public class NotificationServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(NotificationServiceApplication.class, args);
    }
}
