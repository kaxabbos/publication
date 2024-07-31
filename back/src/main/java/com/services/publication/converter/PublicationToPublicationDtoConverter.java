package com.services.publication.converter;

import com.services.publication.Publication;
import com.services.publication.PublicationDto;
import com.services.publicationApplication.converter.PublicationApplicationToPublicationApplicationDtoConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PublicationToPublicationDtoConverter implements Converter<Publication, PublicationDto> {

    private final PublicationApplicationToPublicationApplicationDtoConverter applicationToApplicationDtoConverter;

    @Override
    public PublicationDto convert(Publication source) {
        return new PublicationDto(
                source.getId(),
                source.getName(),
                source.getImg(),
                source.getPrice(),
                source.getDescription(),
                source.getNote(),
                source.getStatus().name(),
                source.getStatus().getName(),
                source.getOwner().getId(),
                source.getApplications().stream().map(applicationToApplicationDtoConverter::convert).collect(Collectors.toList())
        );
    }
}
