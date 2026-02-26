package com.btp.plan.event;

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
    private String entiteId;       // planId
    private String entiteType;     // PLAN
    private String userId;
    private String message;
    private String destinataireId; // userId to notify
    private LocalDateTime timestamp;
}
