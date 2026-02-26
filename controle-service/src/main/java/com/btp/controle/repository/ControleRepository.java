package com.btp.controle.repository;

import com.btp.controle.model.Controle;
import com.btp.controle.model.Decision;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ControleRepository extends MongoRepository<Controle, String> {
    Page<Controle> findByPlanId(String planId, Pageable pageable);
    List<Controle> findByPlanId(String planId);
    Page<Controle> findByControleurIdAndDecision(String controleurId, Decision decision, Pageable pageable);
    List<Controle> findByControleurIdAndDecision(String controleurId, Decision decision);
}
