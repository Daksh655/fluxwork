package com.fluxwork.core.workflow.board.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity // convert this java class into PostgreSql table
@Table(name = "boards") // the table name is boards in DB

@Getter
@Setter
public class BoardEntity { // create board table in PostgreSql

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // primary key with auto increment
    private Long id;

    @Column(nullable = false) // name is mandatory
    private String name;

    private String description;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist   // runs before just safe
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate  // run before update query
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}