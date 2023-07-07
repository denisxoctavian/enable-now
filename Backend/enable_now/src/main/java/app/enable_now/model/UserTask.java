package app.enable_now.model;

import jakarta.persistence.*;

@Entity
@Embeddable
@Table(name = "user_tasks")
public class UserTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "taskId",referencedColumnName = "id")
    private Task task;

    @ManyToOne
    @JoinColumn(name = "userId",referencedColumnName = "id")
    private User user;

    public UserTask() {}

    public UserTask(Task task, User user) {
        this.task = task;
        this.user = user;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "UserTask{" +
                "id=" + id +
                ", task=" + task +
                ", user=" + user +
                '}';
    }
}
