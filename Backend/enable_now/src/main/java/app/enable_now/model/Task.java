package app.enable_now.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
public class Task implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;

    private String type;
    private String description;

    private Date  date;
    private int status;
    @ManyToOne
    @JoinColumn(name = "volunteerId", referencedColumnName = "id", nullable = true)
    private User volunteer;


    public Task(){}
    public Task(int id, String title, String description, String type, Date date, int status, User volunteerId) {
        this.id = id;
        this.title = title;
        this.type=type;
        this.description = description;
        this.status = status;
        this.date=date;
        this.volunteer = volunteerId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public User getVolunteer() {
        return volunteer;
    }

    public void setVolunteer(User volunteerId) {
        this.volunteer = volunteerId;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", type='" + type + '\'' +
                ", description='" + description + '\'' +
                ", date=" + date +
                ", status=" + status +
                ", volunteerId=" + volunteer +
                '}';
    }
}
