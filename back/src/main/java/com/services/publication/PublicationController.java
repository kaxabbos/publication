package com.services.publication;

import com.services.publication.converter.PublicationDtoToPublicationConverter;
import com.services.publication.converter.PublicationToPublicationDtoConverter;
import com.services.system.Result;
import com.services.system.StatusCode;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.stream.Collectors;

import static com.services.util.Global.*;

@RestController
@RequestMapping("/publications")
@RequiredArgsConstructor
public class PublicationController {

    private final PublicationService service;
    private final PublicationToPublicationDtoConverter toDtoConverter;
    private final PublicationDtoToPublicationConverter toConverter;

    @GetMapping
    public Result findAll() {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Find All Publications",
                service.findAll().stream().map(toDtoConverter::convert).collect(Collectors.toList())
        );
    }

    @GetMapping("/{id}")
    @Secured({ADMIN, MANAGER, USER})
    public Result findById(@PathVariable String id) {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Find By Id Publication",
                toDtoConverter.convert(service.findById(id))
        );
    }

    @PostMapping
    @Secured({USER})
    public Result save(@Valid @RequestBody PublicationDto publicationDto) {
        Publication newPublication = toConverter.convert(publicationDto);
        Publication saved = service.save(newPublication);
        PublicationDto savedDto = toDtoConverter.convert(saved);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Save Publication",
                savedDto
        );
    }

    @DeleteMapping("/{id}")
    @Secured({USER})
    public Result delete(@PathVariable String id) {
        service.delete(id);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Delete Publication"
        );
    }

    @PutMapping("/{id}")
    @Secured({USER})
    public Result update(@Valid @RequestBody PublicationDto publicationDto, @PathVariable String id) {
        Publication update = toConverter.convert(publicationDto);
        Publication updated = service.update(update, id);
        PublicationDto updatedDto = toDtoConverter.convert(updated);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Update Publication",
                updatedDto
        );
    }

    @PatchMapping("/{id}/img")
    @Secured({USER})
    public Result updateImg(@RequestParam MultipartFile file, @PathVariable String id) {
        Publication updated = service.updateImg(file, id);
        PublicationDto updatedDto = toDtoConverter.convert(updated);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Update Img Publication",
                updatedDto
        );
    }

    @GetMapping("/{id}/status/done")
    @Secured({MANAGER})
    public Result updateStatusDone(@PathVariable String id) {
        Publication updated = service.updateStatusDone(id);
        PublicationDto updatedDto = toDtoConverter.convert(updated);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Update Status Done Publication",
                updatedDto
        );
    }

    @GetMapping("/{id}/status/closed")
    @Secured({MANAGER, USER})
    public Result updateStatusClosed(@PathVariable String id) {
        Publication updated = service.updateStatusClosed(id);
        PublicationDto updatedDto = toDtoConverter.convert(updated);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Update Status Closed Publication",
                updatedDto
        );
    }

    @GetMapping("/{id}/status/waiting")
    @Secured({USER})
    public Result updateStatusWaiting(@PathVariable String id) {
        Publication updated = service.updateStatusWaiting(id);
        PublicationDto updatedDto = toDtoConverter.convert(updated);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Update Status Waiting Publication",
                updatedDto
        );
    }

    @GetMapping("/{id}/status/correction")
    @Secured({MANAGER})
    public Result updateStatusCorrection(@PathVariable String id, @RequestParam String note) {
        Publication updated = service.updateStatusCorrection(id, note);
        PublicationDto updatedDto = toDtoConverter.convert(updated);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Update Status Correction Publication",
                updatedDto
        );
    }

    @PostMapping("/{id}/applications")
    @Secured({USER})
    public Result addApplication(@PathVariable String id, @RequestParam String description) {
        Publication publication = service.addApplication(id, description);
        PublicationDto publicationDto = toDtoConverter.convert(publication);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Add Application",
                publicationDto
        );
    }

}
