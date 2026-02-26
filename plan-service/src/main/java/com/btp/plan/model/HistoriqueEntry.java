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
public class HistoriqueEntry {
    private String action;
    private LocalDateTime date;
    private String utilisateurId;
    private String details;
}
