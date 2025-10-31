package com.bassem.task_tracker.repository;
import  com.bassem.task_tracker.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface  TaskRepository extends JpaRepository<Task,Long> {

}
