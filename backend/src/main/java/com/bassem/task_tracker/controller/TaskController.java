package com.bassem.task_tracker.controller;
import com.bassem.task_tracker.model.Task;
import com.bassem.task_tracker.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import  org.springframework.web.bind.annotation.*;
import  java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")   // from react f/end
public class TaskController {
    @Autowired
    private TaskService taskService;
    @GetMapping
    public List<Task> getAllTasks(){
        return taskService.getAllTasks();
    }
    @GetMapping("/{id}")
        public Optional<Task> getTaskById(@PathVariable Long id){
        return taskService.getTaskById(id);
        }
        @PostMapping
       public Task createTask(@RequestBody Task task)
    {
        return taskService.createTask(task);
    }
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id ,@RequestBody Task task){

        return taskService.updateTask(id,task);
    }
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id){
        taskService.deleteTask(id);
    }
}
