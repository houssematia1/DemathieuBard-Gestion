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

        // Déterminer le destinataire :
        // 1. destinataireId si présent (projeteur du plan)
        // 2. sinon userId (auteur de l'action) — pas de notification à soi-même si pas de destinataire
        String destinataire = event.getDestinataireId();
        if (destinataire == null || destinataire.isBlank()) {
            // Fallback : notifier l'auteur de l'événement (cas de plan.soumis, etc.)
            destinataire = event.getUserId();
        }

        if (destinataire != null && !destinataire.isBlank()) {
            notificationService.create(
                    destinataire,
                    event.getMessage(),
                    event.getEntiteId(),
                    event.getEntiteType()
            );
        } else {
            log.warn("Événement {} ignoré : aucun destinataire identifiable", event.getRoutingKey());
        }

        // Email (si SMTP configuré)
        if (destinataire != null) {
            emailService.sendIfConfigured(event);
        }
    }
}
