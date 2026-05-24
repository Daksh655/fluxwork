package com.fluxwork.core.workflow.task.repository;

import com.fluxwork.core.workflow.task.entity.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<TaskEntity, Long> {
}