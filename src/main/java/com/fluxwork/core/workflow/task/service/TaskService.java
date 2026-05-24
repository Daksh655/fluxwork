package com.fluxwork.core.workflow.task.service;

import com.fluxwork.core.workflow.board.entity.BoardEntity;
import com.fluxwork.core.workflow.board.repository.BoardRepository;
import com.fluxwork.core.workflow.task.dto.TaskRequest;
import com.fluxwork.core.workflow.task.dto.TaskResponse;
import com.fluxwork.core.workflow.task.entity.TaskEntity;
import com.fluxwork.core.workflow.task.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}