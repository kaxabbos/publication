package com.services.publicationApplication;

import com.services.appUser.UserService;
import com.services.enums.PublicationApplicationStatus;
import com.services.publication.Publication;
import com.services.system.exception.BadRequestException;
import com.services.system.exception.ObjectNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PublicationApplicationService {

    private final PublicationApplicationRepository repository;
    private final UserService userService;

    public List<PublicationApplication> findAllByPublication_Owner_Id(Long ownerId) {
        return repository.findAllByPublication_Owner_Id(ownerId);
    }

    public PublicationApplication findById(String id) {
        try {
            Long longId = Long.parseLong(id);
            return repository.findById(longId).orElseThrow();
        } catch (Exception e) {
            throw new ObjectNotFoundException("Не найдена заявка по ИД " + id);
        }
    }

    public void save(PublicationApplication publicationApplication) {
        repository.save(publicationApplication);
    }

    public Publication done(String id) {
        PublicationApplication application = findById(id);
        checkOwner(application.getPublication().getOwner().getId());
        application.setStatus(PublicationApplicationStatus.DONE);
        application = repository.save(application);
        return application.getPublication();
    }

    public Publication reject(String id) {
        PublicationApplication application = findById(id);
        checkOwner(application.getPublication().getOwner().getId());
        application.setStatus(PublicationApplicationStatus.REJECT);
        application = repository.save(application);
        return application.getPublication();
    }

    private void checkOwner(Long ownerId) {
        if (!ownerId.equals(userService.getCurrentUser().getId())) {
            throw new BadRequestException("У вас нету прав для изменения данной записи");
        }
    }

}
