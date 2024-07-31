package com.services.publication.converter;

import com.services.publication.Publication;
import com.services.publication.PublicationDto;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class PublicationDtoToPublicationConverter implements Converter<PublicationDto, Publication> {
    @Override
    public Publication convert(PublicationDto source) {
        return new Publication(
                source.name(),
                source.price(),
                source.description()
        );
    }
}
