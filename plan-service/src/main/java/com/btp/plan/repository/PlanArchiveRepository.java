package com.btp.plan.repository;

import com.btp.plan.model.PlanArchive;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PlanArchiveRepository extends MongoRepository<PlanArchive, String> {
    List<PlanArchive> findByPlanIdOrderByDateArchiveDesc(String planId);
}
