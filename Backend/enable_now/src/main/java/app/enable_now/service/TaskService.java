package app.enable_now.service;


import app.enable_now.model.Task;
import app.enable_now.model.UserTask;
import app.enable_now.repository.TaskRepository;
import app.enable_now.repository.UserTaskRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserTaskRepository userTaskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository, UserTaskRepository userTaskRepository) {
        this.taskRepository = taskRepository;
        this.userTaskRepository = userTaskRepository;
    }
    public Task addTask(Task task){
        return  this.taskRepository.save(task);
    }
    public Task updateTask(Task task){
        return  this.taskRepository.save(task);
    }

    public void deleteTask(int id){taskRepository.deleteTaskById(id);}
    public UserTask addUserTask(UserTask userTask){return this.userTaskRepository.save(userTask);}
    public List<Task>findAllTask(){return  taskRepository.findAllTask();}
    public Task  findTaskById(int id){return taskRepository.findTaskById(id);}

    public Integer getNumberOfSolvedTasks(){return  taskRepository.getNumberOfSolvedTasks();}

    public List<Task>getTasksOfUser(int id){return taskRepository.getTasksOfUser(id);}
    public List<Task>getTasksOfVolunteer(int id){return  taskRepository.getTasksOfVolunteer(id);}

    public List<UserTask>getAllTaksAndUser(){return  taskRepository.getAllTasksAndUser();}

}
