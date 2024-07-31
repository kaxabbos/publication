package com.services.appUser;

import com.services.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class AppUser implements Serializable {
    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "app_user_g")
    @SequenceGenerator(name = "app_user_g", sequenceName = "app_user_seq", allocationSize = 1)
    private Long id;

    @NotEmpty(message = "username is required")
    private String username;
    @NotEmpty(message = "password is required")
    private String password;

    @Column(length = 1000)
    private String img = "/img/avatar.png";

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    public AppUser(String username) {
        this.username = username;
    }

    public void set(AppUser user) {

    }

}