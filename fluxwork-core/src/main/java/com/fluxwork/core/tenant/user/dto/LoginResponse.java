package com.fluxwork.core.tenant.user.dto;


import com.fluxwork.core.tenant.user.entity.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {

    private Long id;
    private String name;
    private String email;
    private Role role;
    private String token;
}
