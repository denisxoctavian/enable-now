package app.enable_now.repository;

import app.enable_now.model.Task;
import app.enable_now.model.UserTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Integer> {

    Task findTaskById(int id);
    void deleteTaskById(int id);
    @Query(
            value = "SELECT * FROM `task`",
            nativeQuery = true
    )
    List<Task> findAllTask();

    @Query(
            value = "    select count(*) from `task` where status =3",
            nativeQuery = true
    )
   Integer getNumberOfSolvedTasks();

    @Query(
            value = "select a.id,a.date,a.description,a.status,a.title,a.volunteer_id,a.type from task a inner join user_tasks b on a.id = b.task_id where b.user_id = ?1 order by a.status asc",
            nativeQuery = true
    )
    List<Task> getTasksOfUser(int id);

    @Query(
            value = "select * from `task` where volunteer_id=?1 order by date asc",
            nativeQuery = true
    )
    List<Task>getTasksOfVolunteer(int id);

    @Query("SELECT ut FROM UserTask ut " +
            "JOIN FETCH ut.task t " +
            "JOIN FETCH ut.user u " +
            "WHERE t.status = 0 " +
            "ORDER BY t.date ASC")
    List<UserTask> getAllTasksAndUser();


}
