package com.fluxwork.core.workflow.task.repository;

import com.fluxwork.core.workflow.task.entity.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, Long> {

    List<TaskEntity> findByBoardId(Long boardId);

    // THE QUERY IS GONE. NO MORE VALIDATION ERRORS.
}