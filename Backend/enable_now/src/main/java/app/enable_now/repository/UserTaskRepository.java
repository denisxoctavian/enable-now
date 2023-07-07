package app.enable_now.repository;

import app.enable_now.model.Task;
import app.enable_now.model.UserTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserTaskRepository extends JpaRepository<UserTask,Integer> {

    UserTask findUserTaskById(int id);
    void deleteUserTaskById(int id);



}
