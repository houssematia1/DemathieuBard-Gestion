package com.btp.plan.dto;

import lombok.Data;

@Data
public class AddVersionRequest {
    private String commentaire;
    private String fichierUrl;
}
