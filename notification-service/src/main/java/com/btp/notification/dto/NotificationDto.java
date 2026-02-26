package com.btp.notification.dto;

import com.btp.notification.model.TypeNotification;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class NotificationDto {
    private String id;
    private String destinataireId;
    private String message;
    private TypeNotification type;
    private boolean lu;
    private LocalDateTime dateEnvoi;
    private String referenceEntite;
    private String typeEntite;
}
