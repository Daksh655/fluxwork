package com.fluxwork.core.workflow.task.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskUpdateMessage {

    private String action;
    private Long taskId;
}