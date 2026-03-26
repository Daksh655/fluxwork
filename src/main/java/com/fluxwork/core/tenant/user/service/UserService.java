package com.fluxwork.core.tenant.user.service;

import com.fluxwork.core.tenant.user.dto.RegisterRequest;
import com.fluxwork.core.tenant.user.dto.UserResponse;
import com.fluxwork.core.tenant.user.entity.Role;
import com.fluxwork.core.tenant.user.entity.UserEntity;
import com.fluxwork.core.tenant.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service  // marks this class as business logic layer
@RequiredArgsConstructor

public class UserService {
    private final UserRepository userRepository; // injects repository here

    public UserResponse register(RegisterRequest request){

        UserEntity user = new UserEntity(); // what the user or frontend will send to server
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(Role.USER);

        UserEntity savedUser = userRepository.save(user);

        UserResponse response = new UserResponse(); // what to send back to the user or frontend
        response.setId(savedUser.getId());
        response.setName(savedUser.getName());
        response.setEmail(savedUser.getEmail());
        response.setRole(savedUser.getRole());

        return response;
    }
}
