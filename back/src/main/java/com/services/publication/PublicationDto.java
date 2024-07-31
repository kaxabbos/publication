package com.services.publication;

import com.services.publicationApplication.PublicationApplicationDto;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record PublicationDto(
        Long id,
        @NotEmpty(message = "name is required")
        String name,
        String img,
        @NotNull(message = "price is required")
        float price,
        @NotEmpty(message = "description is required")
        String description,
        String note,
        String status,
        String statusName,
        Long ownerId,
        List<PublicationApplicationDto> applications
) {
}
