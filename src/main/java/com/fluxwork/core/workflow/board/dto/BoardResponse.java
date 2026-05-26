package com.fluxwork.core.workflow.board.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class BoardResponse {

    private Long id;

    private String name;

    private String description;

    private LocalDateTime createdAt;
}