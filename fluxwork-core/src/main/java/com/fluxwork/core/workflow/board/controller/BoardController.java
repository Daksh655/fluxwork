package com.fluxwork.core.workflow.board.controller;

import java.util.List;
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

    @GetMapping // GET request
    public ApiResponse<List<BoardResponse>> getAllBoards() {

        List<BoardResponse> response = boardService.getAllBoards();

        return ApiResponse.success(response, "Boards fetched successfully");
    }

    @PutMapping("/{id}") // PUT request by ID
    public ApiResponse<BoardResponse> updateBoard(
            @PathVariable Long id,
            @RequestBody BoardRequest request
    ) {

        BoardResponse response = boardService.updateBoard(id, request);

        return ApiResponse.success(response, "Board updated successfully");
    }

    @DeleteMapping("/{id}") // DELETE request by ID
    public ApiResponse<String> deleteBoard(
            @PathVariable Long id
    ) {

        boardService.deleteBoard(id);

        return ApiResponse.success(
                "Board deleted",
                "Board deleted successfully"
        );
    }
}