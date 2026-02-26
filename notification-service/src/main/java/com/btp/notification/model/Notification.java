package com.btp.notification.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "notifications")
public class Notification {

    @Id
    private String id;

    private String destinataireId;
    private String message;
    private TypeNotification type;

    @Builder.Default
    private boolean lu = false;

    @CreatedDate
    private LocalDateTime dateEnvoi;

    private String referenceEntite; // planId, controleId, affaireId
    private String typeEntite;      // PLAN, CONTROLE, AFFAIRE
}
