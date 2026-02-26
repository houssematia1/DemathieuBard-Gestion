package com.btp.notification.repository;

import com.btp.notification.model.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String> {
    Page<Notification> findByDestinataireId(String destinataireId, Pageable pageable);
    List<Notification> findByDestinataireIdAndLuFalse(String destinataireId);
    long countByDestinataireIdAndLuFalse(String destinataireId);
}
