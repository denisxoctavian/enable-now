package app.enable_now.service;

import app.enable_now.model.User;
import app.enable_now.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User addUser(User user){
        return userRepository.save(user);
    }
    public User updateUser(User user){
        return  userRepository.save(user);
    }
    public void deleteUser(int id){userRepository.deleteUserById(id);}

    public List<User> findAllUsers(){return  userRepository.findAllUsers();}
    public User findUserById(int id){return userRepository.findUserById(id);}
    public User findUserByEmail(String email){return userRepository.findUserByEmail(email);}

    public Integer getVolunteers(){return userRepository.getVolunteers();}
    public Integer getPeopleWithSolvedTasks(){return  userRepository.getPeopleWithSolvedTasks();}

}