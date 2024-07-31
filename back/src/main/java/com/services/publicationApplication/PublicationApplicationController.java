package com.services.publicationApplication;

import com.services.publication.Publication;
import com.services.publication.PublicationDto;
import com.services.publication.converter.PublicationToPublicationDtoConverter;
import com.services.system.Result;
import com.services.system.StatusCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.services.util.Global.USER;

@RestController
@RequestMapping("/applications/{id}")
@Secured({USER})
@RequiredArgsConstructor
public class PublicationApplicationController {

    private final PublicationApplicationService service;
    private final PublicationToPublicationDtoConverter publicationToPublicationDtoConverter;

    @GetMapping("/done")
    public Result done(@PathVariable String id) {
        Publication publication = service.done(id);
        PublicationDto publicationDto = publicationToPublicationDtoConverter.convert(publication);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Done Application",
                publicationDto
        );
    }

    @GetMapping("/reject")
    public Result reject(@PathVariable String id) {
        Publication publication = service.reject(id);
        PublicationDto publicationDto = publicationToPublicationDtoConverter.convert(publication);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Reject Application",
                publicationDto
        );
    }

}
