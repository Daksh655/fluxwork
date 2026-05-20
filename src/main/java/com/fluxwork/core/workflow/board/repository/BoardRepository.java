package com.fluxwork.core.workflow.board.repository;

import com.fluxwork.core.workflow.board.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<BoardEntity, Long> {  // spring automatically creates DB methods for BoardEntity

}
