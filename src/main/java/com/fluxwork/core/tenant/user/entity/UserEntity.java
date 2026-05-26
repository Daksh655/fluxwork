package com.fluxwork.core.tenant.user.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime; // provides time and date

@Entity   // we are telling spring booth to convert this class to a table in DB
@Table(name = "users")

@Getter
@Setter
public class UserEntity {  // creating the class

    @Id   // this marks as primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // this is used to auto generate values in DB like 1,2,3 and so on as data increases and never repeat itself
    private Long id;

    @Column(nullable = false)  // field are converted into columns in DB
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)  // stores ENUM as a text in DB
    private Role role;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist  // runs when saving a new user
    public void onCreate(){
        this.createdAt = LocalDateTime.now();  // shows time of the saved user
    }

    @PreUpdate  // runs when updating a user
    public void onUpdate(){
        this.updatedAt = LocalDateTime.now();  // time when a user was updated
    }

}
