package com.fluxwork.core.workflow.task.controller;

import com.fluxwork.core.common.response.ApiResponse;
import com.fluxwork.core.workflow.task.dto.TaskRequest;
import com.fluxwork.core.workflow.task.dto.TaskResponse;
import com.fluxwork.core.workflow.task.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.fluxwork.core.workflow.task.dto.UpdateTaskStatusRequest;

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
            Principal principal
    ) {
        TaskResponse response = taskService.createTask(request, principal.getName());
        return ApiResponse.success(response, "Task created successfully");
    }

    @GetMapping("/board/{boardId}")
    public ApiResponse<List<TaskResponse>> getTasksByBoard(
            @PathVariable Long boardId,
            Principal principal
    ) {
        List<TaskResponse> response = taskService.getTasksByBoard(boardId, principal.getName());
        return ApiResponse.success(response, "Tasks fetched successfully");
    }

    @PutMapping("/{taskId}/status")
    public ApiResponse<TaskResponse> updateTaskStatus(
            @PathVariable Long taskId,
            @RequestBody UpdateTaskStatusRequest request,
            Principal principal
    ) {
        TaskResponse response = taskService.updateTaskStatus(taskId, request.getStatus(), principal.getName());
        return ApiResponse.success(response, "Task status updated successfully");
    }

    @GetMapping
    public ApiResponse<List<TaskResponse>> getAllTasks(Principal principal) {
        List<TaskResponse> response = taskService.getAllTasksForUser(principal.getName());
        return ApiResponse.success(response, "Tasks fetched successfully");
    }

    @PutMapping("/{taskId}")
    public ApiResponse<TaskResponse> updateTask(
            @PathVariable Long taskId,
            @RequestBody TaskRequest request,
            Principal principal
    ) {
        TaskResponse response = taskService.updateTask(taskId, request, principal.getName());
        return ApiResponse.success(response, "Task updated successfully");
    }

    @DeleteMapping("/{taskId}")
    public ApiResponse<String> deleteTask(
            @PathVariable Long taskId,
            Principal principal
    ) {
        taskService.deleteTask(taskId, principal.getName());
        return ApiResponse.success("Task deleted", "Task deleted successfully");
    }
}