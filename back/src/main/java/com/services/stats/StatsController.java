package com.services.stats;

import com.services.appUser.AppUser;
import com.services.appUser.UserService;
import com.services.enums.PublicationApplicationStatus;
import com.services.enums.Role;
import com.services.publicationApplication.PublicationApplication;
import com.services.publicationApplication.PublicationApplicationService;
import com.services.stats.dto.StatProfileDto;
import com.services.system.Result;
import com.services.system.StatusCode;
import com.services.util.Global;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

import static com.services.util.Global.ADMIN;
import static com.services.util.Global.USER;

@RestController
@RequestMapping("/stats")
@RequiredArgsConstructor
public class StatsController {

    private final PublicationApplicationService applicationService;
    private final UserService userService;

    @GetMapping("/users")
    @Secured({ADMIN})
    public Result getStatsUsers() {
        Map<String, List<StatProfileDto>> res = new HashMap<>();

        List<AppUser> users = userService.findAllByRole(Role.USER);

        for (AppUser user : users) {
            res.put(
                    user.getUsername(),
                    getStatusProfileUser(user.getId())
            );
        }

        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Stats Categories",
                res
        );
    }

    @GetMapping("/profile")
    @Secured({USER})
    public Result getStatsProfile() {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Stats Categories",
                getStatusProfileUser(userService.getCurrentUser().getId())
        );
    }

    private List<StatProfileDto> getStatusProfileUser(Long ownerId) {
        List<PublicationApplication> applications = applicationService.findAllByPublication_Owner_Id(ownerId);

        PublicationApplicationStatus[] statuses = PublicationApplicationStatus.values();

        List<StatProfileDto> res = new ArrayList<>();

        for (PublicationApplicationStatus status : statuses) {
            List<PublicationApplication> temp = new ArrayList<>();

            for (PublicationApplication application : applications) {
                if (application.getStatus() == status) {
                    temp.add(application);
                }
            }

            res.add(new StatProfileDto(
                    status.getName(),
                    temp.size(),
                    Global.round((float) (temp.size() * 100) / (applications.isEmpty() ? 1 : applications.size()))
            ));
        }
        return res;
    }

}
