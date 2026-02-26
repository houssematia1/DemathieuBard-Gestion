package com.btp.plan.repository;

import com.btp.plan.model.Plan;
import com.btp.plan.model.StatutPlan;
import com.btp.plan.model.TypePlan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PlanRepository extends MongoRepository<Plan, String> {
    Page<Plan> findByAffaireId(String affaireId, Pageable pageable);
    List<Plan> findByAffaireId(String affaireId);
    Page<Plan> findByStatut(StatutPlan statut, Pageable pageable);
    Page<Plan> findByTypePlan(TypePlan typePlan, Pageable pageable);
    Page<Plan> findByTypePlanAndStatut(TypePlan typePlan, StatutPlan statut, Pageable pageable);
    Page<Plan> findByAffaireIdAndStatut(String affaireId, StatutPlan statut, Pageable pageable);
}
