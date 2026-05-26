package com.fluxwork.core.tenant.user.service;

import com.fluxwork.core.tenant.user.dto.LoginRequest;
import com.fluxwork.core.tenant.user.dto.LoginResponse;
import com.fluxwork.core.tenant.user.dto.RegisterRequest;
import com.fluxwork.core.tenant.user.dto.UserResponse;
import com.fluxwork.core.tenant.user.entity.Role;
import com.fluxwork.core.tenant.user.entity.UserEntity;
import com.fluxwork.core.tenant.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // REGISTER
    public UserResponse register(RegisterRequest request) {

        boolean userExists = userRepository
                .findByEmail(request.getEmail())
                .isPresent();

        if (userExists) {
            throw new RuntimeException("Email already exists");
        }

        UserEntity user = new UserEntity();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        // BCrypt password encryption
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setRole(Role.USER);

        UserEntity savedUser = userRepository.save(user);

        UserResponse response = new UserResponse();

        response.setId(savedUser.getId());
        response.setName(savedUser.getName());
        response.setEmail(savedUser.getEmail());
        response.setRole(savedUser.getRole());

        return response;
    }

    // LOGIN
    public LoginResponse login(LoginRequest request) {

        UserEntity user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        // BCrypt password check
        boolean passwordMatches = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        if (!passwordMatches) {
            throw new RuntimeException("Invalid password");
        }

        LoginResponse response = new LoginResponse();

        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());

        return response;
    }
}