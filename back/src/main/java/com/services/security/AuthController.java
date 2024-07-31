package com.services.security;

import com.services.system.Result;
import com.services.system.StatusCode;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class AuthController {

    private final AuthService authService;
    private final static Logger LOGGER = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/login")
    public Result getLoginIndo(Authentication authentication) {
        LOGGER.debug("Authenticated user: '{}'", authentication.getName());
        return new Result(
                true,
                StatusCode.SUCCESS,
                "User Info and JSON Web Token",
                authService.createLoginInfo(authentication)
        );
    }
}