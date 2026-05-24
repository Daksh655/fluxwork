package com.fluxwork.core.workflow.task.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class TaskResponse {

    private Long id;

    private String title;

    private String description;

    private String status;

    private String priority;

    private LocalDateTime deadline;

    private Long boardId;

    private LocalDateTime createdAt;
}