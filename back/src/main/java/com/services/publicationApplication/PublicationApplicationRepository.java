package com.services.publicationApplication;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublicationApplicationRepository extends JpaRepository<PublicationApplication, Long> {
    List<PublicationApplication> findAllByPublication_Owner_Id(Long ownerId);
}
