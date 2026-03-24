package com.btp.plan.repository;

import com.btp.plan.model.Plan;
import com.btp.plan.model.StatutPlan;
import com.btp.plan.model.TypePlan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PlanRepository extends MongoRepository<Plan, String> {
    Page<Plan> findByAffaireIdAndArchivedFalse(String affaireId, Pageable pageable);
    List<Plan> findByAffaireIdAndArchivedFalse(String affaireId);
    Page<Plan> findByArchivedFalse(Pageable pageable);
    Page<Plan> findByStatutAndArchivedFalse(StatutPlan statut, Pageable pageable);
    Page<Plan> findByTypePlanAndArchivedFalse(TypePlan typePlan, Pageable pageable);
    Page<Plan> findByTypePlanAndStatutAndArchivedFalse(TypePlan typePlan, StatutPlan statut, Pageable pageable);

    // Compatibilité descendante (sans filtre archived)
    Page<Plan> findByAffaireId(String affaireId, Pageable pageable);
    List<Plan> findByAffaireId(String affaireId);
}
