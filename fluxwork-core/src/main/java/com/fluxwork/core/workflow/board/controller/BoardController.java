package com.fluxwork.core.workflow.board.controller;

import com.fluxwork.core.common.response.ApiResponse;
import com.fluxwork.core.workflow.board.dto.BoardRequest;
import com.fluxwork.core.workflow.board.dto.BoardResponse;
import com.fluxwork.core.workflow.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @PostMapping
    public ApiResponse<BoardResponse> createBoard(
            @RequestBody BoardRequest request,
            Principal principal
    ) {
        BoardResponse response = boardService.createBoard(request, principal.getName());
        return ApiResponse.success(response, "Board created successfully");
    }

    @GetMapping
    public ApiResponse<List<BoardResponse>> getAllBoards(
            Principal principal
    ) {
        List<BoardResponse> response = boardService.getAllBoards(principal.getName());
        return ApiResponse.success(response, "Boards fetched successfully");
    }

    @PutMapping("/{id}")
    public ApiResponse<BoardResponse> updateBoard(
            @PathVariable Long id,
            @RequestBody BoardRequest request
    ) {
        BoardResponse response = boardService.updateBoard(id, request);
        return ApiResponse.success(response, "Board updated successfully");
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteBoard(
            @PathVariable Long id
    ) {
        boardService.deleteBoard(id);
        return ApiResponse.success("Board deleted", "Board deleted successfully");
    }
}