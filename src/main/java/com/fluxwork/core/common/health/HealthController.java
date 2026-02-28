package com.fluxwork.core.common.health;


import com.fluxwork.core.common.response.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/api/health")
    public ApiResponse<String> healthCheck() {

        return new ApiResponse<>(
                200,
                "Service is running",
                "FluxWork Core Backend is UP"
        );
    }
}