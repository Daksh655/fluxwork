package com.fluxwork.core.workflow.board.service;

import com.fluxwork.core.workflow.board.dto.BoardRequest;
import com.fluxwork.core.workflow.board.dto.BoardResponse;
import com.fluxwork.core.workflow.board.entity.BoardEntity;
import com.fluxwork.core.workflow.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service // tell spring that this class contain business logic
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    public BoardResponse createBoard(BoardRequest request) {

        BoardEntity board = new BoardEntity();

        board.setName(request.getName());
        board.setDescription(request.getDescription());

        BoardEntity savedBoard = boardRepository.save(board); // this generate SQL and insert into PostgreSql

        BoardResponse response = new BoardResponse();

        response.setId(savedBoard.getId());
        response.setName(savedBoard.getName());
        response.setDescription(savedBoard.getDescription());
        response.setCreatedAt(savedBoard.getCreatedAt());

        return response;
    }
}