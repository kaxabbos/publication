package com.services.publication;

import com.services.enums.PublicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublicationRepository extends JpaRepository<Publication, Long> {
    List<Publication> findAllByOwner_id(Long ownerId);

    List<Publication> findAllByStatus(PublicationStatus status);
}
