package com.fluxwork.core.tenant.auth;

import com.fluxwork.core.common.response.ApiResponse;
import com.fluxwork.core.tenant.user.dto.RegisterRequest; // register - user to backend
import com.fluxwork.core.tenant.user.dto.UserResponse; // register - backend to user
import com.fluxwork.core.tenant.user.dto.LoginRequest; // login - user to backend
import com.fluxwork.core.tenant.user.dto.LoginResponse; // login - backend to user
import com.fluxwork.core.tenant.user.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;

@RestController  // this handles the http requests, means it create api like GET/user, POST/login, POST/register etc
@RequestMapping("/api/auth") // this is the base of this url for this controller, so everything happening will be inside api/auth
@RequiredArgsConstructor  // auto creates contructor

public class AuthController {
    private final UserService userService; // means it will use UserService

    @PostMapping("/register") // this created the register api , means it send data to server, eg: for register, login, create new user
    public ApiResponse<UserResponse> register(@RequestBody RegisterRequest request) {  // function that runs when a api is called and return from UserResponse.java . @RequestBody : take JSON from frontend and convert to object

    UserResponse response = userService.register(request);
    return ApiResponse.success(response, "User registered successfully");
    }

    @PostMapping("/login") // this create Login api, it sends data to server for verfication
    public ApiResponse<LoginResponse> login(@RequestBody LoginRequest request) {

        LoginResponse response = userService.login(request);

        return ApiResponse.success(response, "Login successful");
    }
}
