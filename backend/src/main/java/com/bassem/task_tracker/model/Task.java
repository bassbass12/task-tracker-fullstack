package com.bassem.task_tracker.model;
import jakarta.persistence.*;
import  lombok.*;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private  String title;
    private String description;
    private  String status;
}
