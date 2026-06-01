package com.fluxwork.core.workflow.task.repository;

import com.fluxwork.core.workflow.task.entity.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, Long> {

    List<TaskEntity> findByBoardId(Long boardId);

    // for security: Find a single task, BUT ONLY if it belongs to this user's board
    @Query("SELECT t FROM TaskEntity t WHERE t.id = :taskId AND t.board.user.email = :userEmail")
    Optional<TaskEntity> findByIdAndUserEmail(@Param("taskId") Long taskId, @Param("userEmail") String userEmail);

    // for security: Find ALL tasks, BUT ONLY if they belong to this user
    @Query("SELECT t FROM TaskEntity t WHERE t.board.user.email = :userEmail")
    List<TaskEntity> findAllByUserEmail(@Param("userEmail") String userEmail);
}