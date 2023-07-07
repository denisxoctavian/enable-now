package app.enable_now.controller;


import app.enable_now.model.Task;
import app.enable_now.model.UserTask;
import app.enable_now.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/task")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Task>> getAllTask(){
        List<Task>tasks = service.findAllTask();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }


    @GetMapping("/solvedtasks")
    public ResponseEntity<Integer> getNumberOfSolvedTasks(){
       Integer numbeOfTasks= service.getNumberOfSolvedTasks();
        return new ResponseEntity<>(numbeOfTasks, HttpStatus.OK);
    }

    @GetMapping("find/{id}")
    public ResponseEntity<Task>getTaskById(@PathVariable("id")int id){
        Task task = service.findTaskById(id);
        return new ResponseEntity<>(task,HttpStatus.OK);
    }

    @GetMapping("of/{id}")
    public ResponseEntity<List<Task>>getTasksOfUser(@PathVariable("id")int id){
        List<Task> tasks = service.getTasksOfUser(id);
        return new ResponseEntity<>(tasks,HttpStatus.OK);
    }

    @GetMapping("taskuser")
    public ResponseEntity<List<UserTask>>getAllTasksAndUser(){
        List<UserTask> tasks = service.getAllTaksAndUser();
        return new ResponseEntity<>(tasks,HttpStatus.OK);
    }

    @GetMapping("ofvol/{id}")
    public ResponseEntity<List<Task>>getTasksOfVolunteer(@PathVariable("id")int id){
        List<Task> tasks = service.getTasksOfVolunteer(id);
        return new ResponseEntity<>(tasks,HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Task>addTask(@RequestBody Task task){
        Task newTask = service.addTask(task);
        return new ResponseEntity<>(newTask,HttpStatus.OK);
    }

    @PostMapping("/insert")
    public ResponseEntity<UserTask>addUserTask(@RequestBody UserTask  userTask){
        UserTask newUserTask = service.addUserTask(userTask);
        return new ResponseEntity<>(newUserTask,HttpStatus.OK);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Task>updateTask(@PathVariable("id") int id, @RequestBody Task task){
        Task oldTask=service.findTaskById(id);
        oldTask=service.updateTask(task);
        return new ResponseEntity<>(oldTask,HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable("id")int id){
        service.deleteTask(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
