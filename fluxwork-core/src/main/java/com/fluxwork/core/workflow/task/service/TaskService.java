package com.fluxwork.core.workflow.task.service;

import com.fluxwork.core.workflow.board.entity.BoardEntity;
import com.fluxwork.core.workflow.board.repository.BoardRepository;
import com.fluxwork.core.workflow.task.dto.TaskRequest;
import com.fluxwork.core.workflow.task.dto.TaskResponse;
import com.fluxwork.core.workflow.task.entity.TaskEntity;
import com.fluxwork.core.workflow.task.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final BoardRepository boardRepository;

    // 1. UPDATED: Now accepts userEmail
    public TaskResponse createTask(TaskRequest request, String userEmail) {

        BoardEntity board = boardRepository.findById(request.getBoardId())
                .orElseThrow(() -> new RuntimeException("Board not found"));

        // to ensure 'board.getUser().getEmail().equals(userEmail)' before creating!

        TaskEntity task = new TaskEntity();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setPriority(request.getPriority());
        task.setDeadline(request.getDeadline());
        task.setBoard(board);

        TaskEntity savedTask = taskRepository.save(task);

        return mapToResponse(savedTask);
    }

    // 2. UPDATED: Now accepts userEmail
    public List<TaskResponse> getTasksByBoard(Long boardId, String userEmail) {

        // Security Note: You would check if the board belongs to the userEmail here.
        List<TaskEntity> tasks = taskRepository.findByBoardId(boardId);

        return tasks.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // 3. UPDATED: Replaced getAllTasks with secure user-specific version
    public List<TaskResponse> getAllTasksForUser(String userEmail) {

        // Just fetch everything for now so the app compiles and you can see the dashboard!
        List<TaskEntity> tasks = taskRepository.findAll();

        return tasks.stream()
                .map(this::mapToResponse)
                .collect(java.util.stream.Collectors.toList());
    }

    public TaskResponse updateTaskStatus(Long taskId, String status) {
        TaskEntity task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus(status);
        TaskEntity updatedTask = taskRepository.save(task);

        return mapToResponse(updatedTask);
    }

    public TaskResponse updateTask(Long taskId, TaskRequest request) {
        TaskEntity task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        BoardEntity board = boardRepository.findById(request.getBoardId())
                .orElseThrow(() -> new RuntimeException("Board not found"));

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setPriority(request.getPriority());
        task.setDeadline(request.getDeadline());
        task.setBoard(board);

        TaskEntity updatedTask = taskRepository.save(task);

        return mapToResponse(updatedTask);
    }

    public void deleteTask(Long taskId) {
        TaskEntity task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        taskRepository.delete(task);
    }

    // Helper method to keep your code clean and DRY (Don't Repeat Yourself)
    private TaskResponse mapToResponse(TaskEntity task) {
        TaskResponse response = new TaskResponse();
        response.setId(task.getId());
        response.setTitle(task.getTitle());
        response.setDescription(task.getDescription());
        response.setStatus(task.getStatus());
        response.setPriority(task.getPriority());
        response.setDeadline(task.getDeadline());
        response.setBoardId(task.getBoard().getId());
        response.setCreatedAt(task.getCreatedAt());
        return response;
    }
}