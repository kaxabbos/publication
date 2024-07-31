package com.services.publicationApplication;

public record PublicationApplicationDto(
        Long id,
        String description,
        String status,
        String statusName,
        Long ownerId,
        String ownerName
) {
}
