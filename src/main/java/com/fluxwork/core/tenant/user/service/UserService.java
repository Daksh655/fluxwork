package com.fluxwork.core.tenant.user.service;

import com.fluxwork.core.tenant.user.dto.RegisterRequest; // register part - user -> backend
import com.fluxwork.core.tenant.user.dto.UserResponse; // register part - backend -> user
import com.fluxwork.core.tenant.user.dto.LoginRequest; // login part -  user -> backend
import com.fluxwork.core.tenant.user.dto.LoginResponse; // login part - backend -> user
import com.fluxwork.core.tenant.user.entity.Role;
import com.fluxwork.core.tenant.user.entity.UserEntity;
import com.fluxwork.core.tenant.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;


@Service  // marks this class as business logic layer
@RequiredArgsConstructor

public class UserService {
    private final UserRepository userRepository; // injects repository here
    private final PasswordEncoder passwordEncoder; // this is used for BCrypt the password

    // this is for registration - user request and response
    public UserResponse register(RegisterRequest request){

        UserEntity user = new UserEntity(); // what the user or frontend will send to server
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // this is where BCrypt is added
        user.setRole(Role.USER);

        UserEntity savedUser = userRepository.save(user);

        UserResponse response = new UserResponse(); // what to send back to the user or frontend
        response.setId(savedUser.getId());
        response.setName(savedUser.getName());
        response.setEmail(savedUser.getEmail());
        response.setRole(savedUser.getRole());

        return response;
    }

    //  this is for Login - user request and response
    public LoginResponse login(LoginRequest request) {

        UserEntity user = userRepository.findByEmail(request.getEmail()) // run the code of if the email exist in DB
                .orElseThrow(() -> new RuntimeException("User not found")); // runs when the email does not exist

        boolean passwordMatches = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        if (!passwordMatches) {
            throw new RuntimeException("Invalid password");
        }

        LoginResponse response = new LoginResponse(); // this is what the user will receive

        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());

        return response;
    }
}
