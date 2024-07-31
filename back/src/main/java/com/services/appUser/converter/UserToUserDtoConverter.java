package com.services.appUser.converter;

import com.services.appUser.AppUser;
import com.services.appUser.UserDto;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class UserToUserDtoConverter implements Converter<AppUser, UserDto> {

    @Override
    public UserDto convert(AppUser source) {
        return new UserDto(
                source.getId(),
                source.getUsername(),
                source.getImg(),
                source.getRole().name(),
                source.getRole().getName()
        );
    }
}
