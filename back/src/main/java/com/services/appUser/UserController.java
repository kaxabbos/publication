package com.services.appUser;

import com.services.appUser.converter.UserDtoToUserConverter;
import com.services.appUser.converter.UserToUserDtoConverter;
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
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;
    private final UserToUserDtoConverter toDtoConverter;
    private final UserDtoToUserConverter toUserConverter;

    @Secured({ADMIN})
    @GetMapping
    public Result findAll() {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Find All Users Success",
                service.findAll().stream().map(toDtoConverter::convert).collect(Collectors.toList())
        );
    }

    @Secured({ADMIN, MANAGER, USER})
    @GetMapping("/profile")
    public Result find() {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Find User Success",
                toDtoConverter.convert(service.getCurrentUser())
        );
    }

    @Secured({ADMIN})
    @GetMapping("/{userId}")
    public Result findById(@PathVariable String userId) {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Find One User Success",
                toDtoConverter.convert(service.findById(userId))
        );
    }

    @PostMapping
    public Result addUser(@Valid @RequestBody AppUser newUser) {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Add Success",
                toDtoConverter.convert(service.save(newUser))
        );
    }

    @PutMapping
    @Secured({ADMIN, MANAGER, USER})
    public Result update(@Valid @RequestBody UserDto updateDto) {
        AppUser update = toUserConverter.convert(updateDto);
        AppUser updated = service.update(update);
        UserDto updatedDto = toDtoConverter.convert(updated);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Update Success",
                updatedDto
        );
    }

    @PatchMapping("/img")
    @Secured({ADMIN, MANAGER, USER})
    public Result updateImg(@RequestParam MultipartFile file) {
        AppUser user = service.updateImg(file);
        UserDto userDto = toDtoConverter.convert(user);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Update Img Success",
                userDto
        );
    }

    @PatchMapping("/{userId}/role")
    @Secured({ADMIN})
    public Result updateRole(@PathVariable String userId, @RequestParam String role) {
        AppUser updated = service.updateRole(userId, role);
        UserDto updatedDto = toDtoConverter.convert(updated);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Update Role Success",
                updatedDto
        );
    }

    @Secured({ADMIN})
    @DeleteMapping("/{userId}")
    public Result delete(@PathVariable String userId) {
        service.deleteById(userId);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Delete Success"
        );
    }
}
