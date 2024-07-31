package com.services.publicationApplication.converter;

import com.services.publicationApplication.PublicationApplication;
import com.services.publicationApplication.PublicationApplicationDto;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class PublicationApplicationToPublicationApplicationDtoConverter implements Converter<PublicationApplication, PublicationApplicationDto> {
    @Override
    public PublicationApplicationDto convert(PublicationApplication source) {
        return new PublicationApplicationDto(
                source.getId(),
                source.getDescription(),
                source.getStatus().name(),
                source.getStatus().getName(),
                source.getOwner().getId(),
                source.getOwner().getUsername()
        );
    }
}
