package com.fluxwork.core.workflow.task.controller;

import com.fluxwork.core.common.response.ApiResponse;
import com.fluxwork.core.workflow.task.dto.TaskRequest;
import com.fluxwork.core.workflow.task.dto.TaskResponse;
import com.fluxwork.core.workflow.task.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.fluxwork.core.workflow.task.dto.UpdateTaskStatusRequest;
import java.util.List;

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


    @GetMapping("/board/{boardId}") // used for filtering relational data fetching
    public ApiResponse<List<TaskResponse>> getTasksByBoard(
            @PathVariable Long boardId
    ) {

        List<TaskResponse> response =
                taskService.getTasksByBoard(boardId);

        return ApiResponse.success(
                response,
                "Tasks fetched successfully"
        );
    }

    // this is used to update the status
    @PutMapping("/{taskId}/status")
    public ApiResponse<TaskResponse> updateTaskStatus(
            @PathVariable Long taskId,
            @RequestBody UpdateTaskStatusRequest request
    ) {

        TaskResponse response = taskService.updateTaskStatus(
                taskId,
                request.getStatus()
        );

        return ApiResponse.success(
                response,
                "Task status updated successfully"
        );
    }

    // used to get all task
    @GetMapping
    public ApiResponse<List<TaskResponse>> getAllTasks() {

        List<TaskResponse> response = taskService.getAllTasks();

        return ApiResponse.success(
                response,
                "Tasks fetched successfully"
        );
    }

    // for updating items in task
    @PutMapping("/{taskId}")
    public ApiResponse<TaskResponse> updateTask(
            @PathVariable Long taskId,
            @RequestBody TaskRequest request
    ) {

        TaskResponse response =
                taskService.updateTask(taskId, request);

        return ApiResponse.success(
                response,
                "Task updated successfully"
        );
    }

    // deleting task
    @DeleteMapping("/{taskId}")
    public ApiResponse<String> deleteTask(
            @PathVariable Long taskId
    ) {

        taskService.deleteTask(taskId);

        return ApiResponse.success(
                "Task deleted",
                "Task deleted successfully"
        );
    }
}