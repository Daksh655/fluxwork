// this is what we will send back or return to the frontend or the things user will see
package com.fluxwork.core.tenant.user.dto;

import com.fluxwork.core.tenant.user.entity.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private Role role;
}
