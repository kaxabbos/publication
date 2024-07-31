package com.services.appUser;

public record UserDto(
        Long id,
        String username,
        String img,
        String role,
        String roleName
) {
}
