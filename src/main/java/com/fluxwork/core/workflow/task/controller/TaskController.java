package com.fluxwork.core.workflow.task.controller;

import com.fluxwork.core.common.response.ApiResponse;
import com.fluxwork.core.workflow.task.dto.TaskRequest;
import com.fluxwork.core.workflow.task.dto.TaskResponse;
import com.fluxwork.core.workflow.task.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ApiResponse<TaskResponse> createTask(
            @RequestBody TaskRequest request
    ) {

        TaskResponse response = taskService.createTask(request);

        return ApiResponse.success(response, "Task created successfully");
    }
}