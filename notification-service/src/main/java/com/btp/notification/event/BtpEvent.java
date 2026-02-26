package com.btp.notification.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BtpEvent {
    private String routingKey;
    private String entiteId;
    private String entiteType;
    private String userId;
    private String message;
    private String destinataireId;
    private LocalDateTime timestamp;
}
