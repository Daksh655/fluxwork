package com.fluxwork.core.workflow.board.controller;

import com.fluxwork.core.common.response.ApiResponse;
import com.fluxwork.core.workflow.board.dto.BoardRequest;
import com.fluxwork.core.workflow.board.dto.BoardResponse;
import com.fluxwork.core.workflow.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController // this class handles HTTP APIs

@RequestMapping("/api/boards")  // base url becomes: /api/boards
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @PostMapping // POST request
    public ApiResponse<BoardResponse> createBoard(
            @RequestBody BoardRequest request // converts into broadRequest
    ) {

        BoardResponse response = boardService.createBoard(request);

        return ApiResponse.success(response, "Board created successfully");
    }
}