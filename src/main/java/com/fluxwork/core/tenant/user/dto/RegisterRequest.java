// this represents what the frontend sends
// it is only API request model
package com.fluxwork.core.tenant.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    private String name;
    private String email;
    private String password;
}
