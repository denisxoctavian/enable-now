package app.enable_now.repository;

import app.enable_now.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Integer> {

    User findUserById(int id);
    User findUserByEmail(String email);

    void deleteUserById(int id);

    @Query(
            value = "SELECT COUNT(*) FROM `user` where type=1;",
            nativeQuery = true
    )
    Integer getVolunteers();

    @Query(
            value="SELECT COUNT(*) AS user_count\n" +
                    "FROM (\n" +
                    "  SELECT DISTINCT u.id, u.email, u.first_name, u.last_name\n" +
                    "  FROM user u\n" +
                    "  JOIN user_tasks ut ON u.id = ut.user_id\n" +
                    "  JOIN task t ON ut.task_id = t.id\n" +
                    "  WHERE t.status = 3\n" +
                    ") AS  usersWithTasksCompleted",
            nativeQuery = true
    )
    Integer getPeopleWithSolvedTasks();

    @Query(
            value = "SELECT * FROM `user`",
            nativeQuery = true
    )
    List<User> findAllUsers();



}
