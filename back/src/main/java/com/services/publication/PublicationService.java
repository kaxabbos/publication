package com.services.publication;

import com.services.appUser.AppUser;
import com.services.appUser.UserService;
import com.services.enums.PublicationStatus;
import com.services.enums.Role;
import com.services.publicationApplication.PublicationApplication;
import com.services.publicationApplication.PublicationApplicationService;
import com.services.system.exception.BadRequestException;
import com.services.system.exception.ObjectNotFoundException;
import com.services.util.Global;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PublicationService {

    private final PublicationRepository repository;
    private final UserService userService;
    private final PublicationApplicationService applicationService;

    public List<Publication> findAll() {
        return repository.findAll();
    }

    public Publication findById(String id) {
        try {
            Long longId = Long.parseLong(id);
            return repository.findById(longId).orElseThrow();
        } catch (Exception e) {
            throw new ObjectNotFoundException("Не найдена публикация по ИД " + id);
        }
    }

    public Publication save(Publication publication) {
        AppUser owner = userService.getCurrentUser();
        publication.setOwner(owner);
        return repository.save(publication);
    }

    public Publication update(Publication newPublication, String id) {
        Publication old = findById(id);

        checkOwner(old.getOwner().getId());

        old.set(newPublication);

        return repository.save(old);
    }

    public void delete(String id) {
        Publication delete = findById(id);

        checkOwner(delete.getOwner().getId());

        repository.deleteById(delete.getId());
    }

    public Publication updateImg(MultipartFile file, String id) {
        Publication publication = findById(id);

        checkOwner(publication.getOwner().getId());

        try {
            if (file != null && !Objects.requireNonNull(file.getOriginalFilename()).isEmpty()) {
                publication.setImg(Global.saveFile(file, "/publications"));
            }
        } catch (Exception e) {
            throw new BadRequestException("Некорректный файл");
        }

        return repository.save(publication);
    }

    private void checkOwner(Long ownerId) {
        if (!ownerId.equals(userService.getCurrentUser().getId())) {
            throw new BadRequestException("У вас нету прав для изменения данной записи");
        }
    }

    public Publication updateStatusDone(String id) {
        Publication publication = findById(id);

        if (publication.getStatus() != PublicationStatus.WAITING) {
            throw new BadRequestException("Некорректное изменение");
        }

        publication.setStatus(PublicationStatus.DONE);

        return repository.save(publication);
    }

    public Publication updateStatusClosed(String id) {
        Publication publication = findById(id);
        if (userService.getCurrentUser().getRole() == Role.USER) {
            checkOwner(publication.getOwner().getId());
        }

        if (publication.getStatus() != PublicationStatus.DONE) {
            throw new BadRequestException("Некорректное изменение");
        }

        publication.setStatus(PublicationStatus.CLOSED);

        return repository.save(publication);
    }

    public Publication updateStatusWaiting(String id) {
        Publication publication = findById(id);
        checkOwner(publication.getOwner().getId());

        if (publication.getStatus() != PublicationStatus.CORRECTION && publication.getStatus() != PublicationStatus.CLOSED) {
            throw new BadRequestException("Некорректное изменение");
        }

        publication.setNote("");

        publication.setStatus(PublicationStatus.WAITING);

        return repository.save(publication);
    }

    public Publication updateStatusCorrection(String id, String note) {
        Publication publication = findById(id);

        if (publication.getStatus() != PublicationStatus.WAITING) {
            throw new BadRequestException("Некорректное изменение");
        }

        publication.setNote(note);

        publication.setStatus(PublicationStatus.CORRECTION);

        return repository.save(publication);
    }

    public Publication addApplication(String id, String description) {
        Publication publication = findById(id);
        AppUser owner = userService.getCurrentUser();

        if (publication.getOwner().getId().equals(owner.getId())) {
            throw new BadRequestException("Некорректные данные");
        }

        applicationService.save(new PublicationApplication(description, publication, owner));

        return findById(id);
    }
}
