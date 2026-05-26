package com.fluxwork.core.workflow.board.service;

import java.util.List;
import java.util.stream.Collectors;
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

    // this is the creat a new board
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

    // this is to find all the board form DB
    public List<BoardResponse> getAllBoards() {

        List<BoardEntity> boards = boardRepository.findAll(); // fetch all board

        return boards.stream().map(board -> { // convert boardEntity to boardResponse

            BoardResponse response = new BoardResponse();

            response.setId(board.getId());
            response.setName(board.getName());
            response.setDescription(board.getDescription());
            response.setCreatedAt(board.getCreatedAt());

            return response;

        }).collect(Collectors.toList()); // Converts stream back into List
    }

    // this is the update the board by using ID
    public BoardResponse updateBoard(Long id, BoardRequest request) {

        BoardEntity board = boardRepository.findById(id) // it will fetch board from DB using primary key
                .orElseThrow(() -> new RuntimeException("Board not found"));

        board.setName(request.getName());
        board.setDescription(request.getDescription());

        BoardEntity updatedBoard = boardRepository.save(board);

        BoardResponse response = new BoardResponse();

        response.setId(updatedBoard.getId());
        response.setName(updatedBoard.getName());
        response.setDescription(updatedBoard.getDescription());
        response.setCreatedAt(updatedBoard.getCreatedAt());

        return response;
    }

    // this is to delete a board using id
    public void deleteBoard(Long id) {

        BoardEntity board = boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Board not found"));

        boardRepository.delete(board); // auto generate sql query of deletion
    }
}