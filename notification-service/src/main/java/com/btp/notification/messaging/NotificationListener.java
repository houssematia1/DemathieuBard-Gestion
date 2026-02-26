package com.btp.notification.messaging;

import com.btp.notification.config.RabbitMQConfig;
import com.btp.notification.event.BtpEvent;
import com.btp.notification.service.EmailService;
import com.btp.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class NotificationListener {

    private final NotificationService notificationService;
    private final EmailService emailService;

    @RabbitListener(queues = RabbitMQConfig.QUEUE)
    public void handleEvent(BtpEvent event) {
        log.info("Événement reçu : {} pour l'entité {}", event.getRoutingKey(), event.getEntiteId());

        // Si un destinataire est spécifié, créer une notification in-app
        if (event.getDestinataireId() != null && !event.getDestinataireId().isBlank()) {
            notificationService.create(
                    event.getDestinataireId(),
                    event.getMessage(),
                    event.getEntiteId(),
                    event.getEntiteType()
            );
        }

        // Pour les événements clés, tenter d'envoyer un email (si configuré)
        if (event.getDestinataireId() != null) {
            emailService.sendIfConfigured(event);
        }
    }
}
