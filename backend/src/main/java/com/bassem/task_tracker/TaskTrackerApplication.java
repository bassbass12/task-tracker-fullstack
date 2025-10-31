package com.bassem.task_tracker;

import com.bassem.task_tracker.model.Task;
import lombok.Lombok;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TaskTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskTrackerApplication.class, args);
		// test lombok
		Task testtask = new Task();
		testtask.setTitle("test title");
        testtask.setDescription(" test Desc");
		testtask.setStatus(" test status");
		System.out.println("Title :" + testtask.getTitle());
		System.out.println("Desc :" + testtask.getDescription());
		System.out.println("Status :" + testtask.getStatus());

	}

}
