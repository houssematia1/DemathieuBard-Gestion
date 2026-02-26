package com.btp.notification.service;

import com.btp.notification.event.BtpEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String fromEmail;

    /**
     * Envoie un email uniquement si SMTP est configuré (username non vide).
     * En développement sans SMTP, cette méthode log et ne fait rien.
     */
    public void sendIfConfigured(BtpEvent event) {
        if (fromEmail == null || fromEmail.isBlank()) {
            log.debug("SMTP non configuré — email ignoré pour l'événement {}", event.getRoutingKey());
            return;
        }
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(fromEmail); // destinataire = email configuré (à remplacer par lookup userId→email)
            message.setSubject("[BTP] " + event.getRoutingKey());
            message.setText(event.getMessage() != null ? event.getMessage() : "Nouvel événement BTP");
            mailSender.send(message);
            log.info("Email envoyé pour l'événement {}", event.getRoutingKey());
        } catch (Exception e) {
            log.warn("Échec envoi email pour l'événement {} : {}", event.getRoutingKey(), e.getMessage());
        }
    }
}
