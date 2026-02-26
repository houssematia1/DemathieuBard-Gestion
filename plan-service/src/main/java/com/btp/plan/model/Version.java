package com.btp.plan.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Version {
    private String idVersion;
    private int numeroVersion;
    private String indice; // A, B, C...
    private LocalDateTime dateUpload;
    private String commentaire;
    private String fichierUrl;
    private String uploadePar; // userId
}
