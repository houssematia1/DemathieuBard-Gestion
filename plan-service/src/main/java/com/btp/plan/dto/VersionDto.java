package com.btp.plan.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class VersionDto {
    private String idVersion;
    private int numeroVersion;
    private String indice;
    private LocalDateTime dateUpload;
    private String commentaire;
    private String fichierUrl;
    private String uploadePar;
}
