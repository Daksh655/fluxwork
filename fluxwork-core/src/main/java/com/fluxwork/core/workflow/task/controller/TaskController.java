package com.fluxwork.core.workflow.task.controller;

import com.fluxwork.core.common.response.ApiResponse;
import com.fluxwork.core.workflow.task.dto.TaskRequest;
import com.fluxwork.core.workflow.task.dto.TaskResponse;
import com.fluxwork.core.workflow.task.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.fluxwork.core.workflow.task.dto.UpdateTaskStatusRequest;

// 1. Import Principal!
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ApiResponse<TaskResponse> createTask(
            @RequestBody TaskRequest request,
            Principal principal // Added Principal here too for safe creation
    ) {
        // You should pass the user's identity to ensure the task is created under their account
        TaskResponse response = taskService.createTask(request, principal.getName());
        return ApiResponse.success(response, "Task created successfully");
    }

    @GetMapping("/board/{boardId}")
    public ApiResponse<List<TaskResponse>> getTasksByBoard(
            @PathVariable Long boardId,
            Principal principal // Added Principal
    ) {
        // Pass the user's identity to ensure they actually own this board
        List<TaskResponse> response = taskService.getTasksByBoard(boardId, principal.getName());
        return ApiResponse.success(response, "Tasks fetched successfully");
    }

    @PutMapping("/{taskId}/status")
    public ApiResponse<TaskResponse> updateTaskStatus(
            @PathVariable Long taskId,
            @RequestBody UpdateTaskStatusRequest request,
            Principal principal // 🔒 Added Security Check
    ) {
        // Pass the user's email to the service!
        TaskResponse response = taskService.updateTaskStatus(taskId, request.getStatus(), principal.getName());
        return ApiResponse.success(response, "Task status updated successfully");
    }

    // THIS IS THE MOST IMPORTANT FIX
    @GetMapping
    public ApiResponse<List<TaskResponse>> getAllTasks(Principal principal) {

        // 1. Extract the logged-in user's email/username from the security context
        String userEmail = principal.getName();

        // 2. Pass it to the service so it ONLY fetches tasks for this specific user
        List<TaskResponse> response = taskService.getAllTasksForUser(userEmail);

        return ApiResponse.success(response, "Tasks fetched successfully");
    }

    @PutMapping("/{taskId}")
    public ApiResponse<TaskResponse> updateTask(
            @PathVariable Long taskId,
            @RequestBody TaskRequest request,
            Principal principal // 🔒 Added Security Check
    ) {
        TaskResponse response = taskService.updateTask(taskId, request, principal.getName());
        return ApiResponse.success(response, "Task updated successfully");
    }

    @DeleteMapping("/{taskId}")
    public ApiResponse<String> deleteTask(
            @PathVariable Long taskId,
            Principal principal // 🔒 Added Security Check
    ) {
        taskService.deleteTask(taskId, principal.getName());
        return ApiResponse.success("Task deleted", "Task deleted successfully");
    }
}