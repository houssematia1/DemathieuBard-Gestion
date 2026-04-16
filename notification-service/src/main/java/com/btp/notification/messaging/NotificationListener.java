package com.btp.notification.messaging;

import com.btp.notification.config.RabbitMQConfig;
import com.btp.notification.event.BtpEvent;
import com.btp.notification.service.EmailService;
import com.btp.notification.service.NotificationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
@Slf4j
public class NotificationListener {

    private final NotificationService notificationService;
    private final EmailService emailService;
    private final ObjectMapper objectMapper;

    @RabbitListener(queues = RabbitMQConfig.QUEUE)
    public void handleEvent(Message message) {
        String body = new String(message.getBody(), StandardCharsets.UTF_8);
        log.info("MESSAGE RABBIT RECU: {}", body);

        try {
            BtpEvent event = objectMapper.readValue(body, BtpEvent.class);

            String destinataire = event.getDestinataireId();
            if (destinataire == null || destinataire.isBlank()) {
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
                log.warn("Événement ignoré : aucun destinataire (routingKey={})", event.getRoutingKey());
            }

            emailService.sendIfConfigured(event);

        } catch (Exception e) {
            log.error("Erreur traitement message RabbitMQ: {} | body={}", e.getMessage(), body);
        }
    }
}
