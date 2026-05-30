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

    public TaskResponse createTask(TaskRequest request, String userEmail) {
        BoardEntity board = boardRepository.findById(request.getBoardId())
                .orElseThrow(() -> new RuntimeException("Board not found"));

        if (!board.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("Unauthorized: You do not own this board");
        }

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

    public List<TaskResponse> getTasksByBoard(Long boardId, String userEmail) {
        return taskRepository.findByBoardId(boardId).stream()
                .filter(task -> task.getBoard().getUser().getEmail().equals(userEmail))
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<TaskResponse> getAllTasksForUser(String userEmail) {
        return taskRepository.findAll().stream()
                .filter(task -> task.getBoard() != null && task.getBoard().getUser().getEmail().equals(userEmail))
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public TaskResponse updateTaskStatus(Long taskId, String status, String userEmail) {
        TaskEntity task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getBoard().getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("Unauthorized action");
        }

        task.setStatus(status);
        TaskEntity updatedTask = taskRepository.save(task);
        return mapToResponse(updatedTask);
    }

    public TaskResponse updateTask(Long taskId, TaskRequest request, String userEmail) {
        TaskEntity task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getBoard().getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("Unauthorized action");
        }

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

    public void deleteTask(Long taskId, String userEmail) {
        TaskEntity task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getBoard().getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("Unauthorized action");
        }
        taskRepository.delete(task);
    }

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