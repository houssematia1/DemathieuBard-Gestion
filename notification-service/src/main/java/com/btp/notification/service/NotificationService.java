package com.btp.notification.service;

import com.btp.notification.dto.NotificationDto;
import com.btp.notification.exception.ResourceNotFoundException;
import com.btp.notification.model.Notification;
import com.btp.notification.model.TypeNotification;
import com.btp.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationDto create(String destinataireId, String message, String entiteId, String typeEntite) {
        Notification notification = Notification.builder()
                .destinataireId(destinataireId)
                .message(message)
                .type(TypeNotification.IN_APP)
                .lu(false)
                .referenceEntite(entiteId)
                .typeEntite(typeEntite)
                .build();

        Notification saved = notificationRepository.save(notification);
        log.info("Notification créée pour l'utilisateur {}", destinataireId);
        return toDto(saved);
    }

    public Page<NotificationDto> findByUser(String userId, Pageable pageable) {
        return notificationRepository.findByDestinataireId(userId, pageable).map(this::toDto);
    }

    public List<NotificationDto> findNonLues(String userId) {
        return notificationRepository.findByDestinataireIdAndLuFalse(userId)
                .stream().map(this::toDto).toList();
    }

    public long countNonLues(String userId) {
        return notificationRepository.countByDestinataireIdAndLuFalse(userId);
    }

    public NotificationDto markAsRead(String id) {
        Notification n = getOrThrow(id);
        n.setLu(true);
        return toDto(notificationRepository.save(n));
    }

    public void markAllAsRead(String userId) {
        List<Notification> nonLues = notificationRepository.findByDestinataireIdAndLuFalse(userId);
        nonLues.forEach(n -> n.setLu(true));
        notificationRepository.saveAll(nonLues);
        log.info("{} notifications marquées lues pour {}", nonLues.size(), userId);
    }

    /* ── Private ─────────────────────────────────────────────── */

    private Notification getOrThrow(String id) {
        return notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification non trouvée : " + id));
    }

    public NotificationDto toDto(Notification n) {
        return NotificationDto.builder()
                .id(n.getId())
                .destinataireId(n.getDestinataireId())
                .message(n.getMessage())
                .type(n.getType())
                .lu(n.isLu())
                .dateEnvoi(n.getDateEnvoi())
                .referenceEntite(n.getReferenceEntite())
                .typeEntite(n.getTypeEntite())
                .build();
    }
}
