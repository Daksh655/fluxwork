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

    // used to create task
    public TaskResponse createTask(TaskRequest request) {

        BoardEntity board = boardRepository.findById(request.getBoardId()) // relationship connection between task and board
                .orElseThrow(() -> new RuntimeException("Board not found"));

        TaskEntity task = new TaskEntity();

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setPriority(request.getPriority());
        task.setDeadline(request.getDeadline());

        task.setBoard(board);

        TaskEntity savedTask = taskRepository.save(task);

        TaskResponse response = new TaskResponse();

        response.setId(savedTask.getId());
        response.setTitle(savedTask.getTitle());
        response.setDescription(savedTask.getDescription());
        response.setStatus(savedTask.getStatus());
        response.setPriority(savedTask.getPriority());
        response.setDeadline(savedTask.getDeadline());

        response.setBoardId(savedTask.getBoard().getId());
        response.setCreatedAt(savedTask.getCreatedAt());

        return response;
    }

    // fetch tasks by board
    public List<TaskResponse> getTasksByBoard(Long boardId) {

        List<TaskEntity> tasks = taskRepository.findByBoardId(boardId);

        return tasks.stream().map(task -> {

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

        }).collect(Collectors.toList());
    }


    // update task status
    public TaskResponse updateTaskStatus(
            Long taskId,
            String status
    ) {

        TaskEntity task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus(status); // update only task field

        TaskEntity updatedTask = taskRepository.save(task);

        TaskResponse response = new TaskResponse();

        response.setId(updatedTask.getId());
        response.setTitle(updatedTask.getTitle());
        response.setDescription(updatedTask.getDescription());
        response.setStatus(updatedTask.getStatus());
        response.setPriority(updatedTask.getPriority());
        response.setDeadline(updatedTask.getDeadline());

        response.setBoardId(updatedTask.getBoard().getId());
        response.setCreatedAt(updatedTask.getCreatedAt());

        return response;
    }

    // get all task
    public List<TaskResponse> getAllTasks() {

        List<TaskEntity> tasks = taskRepository.findAll();

        return tasks.stream().map(task -> {

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

        }).collect(Collectors.toList());
    }

    // to update all the items in task
    public TaskResponse updateTask(
            Long taskId,
            TaskRequest request
    ) {

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

        TaskResponse response = new TaskResponse();

        response.setId(updatedTask.getId());
        response.setTitle(updatedTask.getTitle());
        response.setDescription(updatedTask.getDescription());
        response.setStatus(updatedTask.getStatus());
        response.setPriority(updatedTask.getPriority());
        response.setDeadline(updatedTask.getDeadline());

        response.setBoardId(updatedTask.getBoard().getId());
        response.setCreatedAt(updatedTask.getCreatedAt());

        return response;
    }

    // used for deleting task
    public void deleteTask(Long taskId) {

        TaskEntity task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        taskRepository.delete(task);
    }
}