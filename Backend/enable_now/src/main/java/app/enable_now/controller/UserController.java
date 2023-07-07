package app.enable_now.controller;

import app.enable_now.model.User;
import app.enable_now.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>>getAllUsers(){
        List<User>users = service.findAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<User>getUserById(@PathVariable("id")int id){
        User user = service.findUserById(id);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }

    @GetMapping("/findbyemail/{email}")
    public ResponseEntity<User>getUserByEmail(@PathVariable("email")String email){
        User user = service.findUserByEmail(email);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }

    @GetMapping("/volunteers")
    public ResponseEntity<Integer>getVolunteers(){
        Integer volunteers = service.getVolunteers();
        return new ResponseEntity<>(volunteers,HttpStatus.OK);
    }

    @GetMapping("/solvedpeople")
    public ResponseEntity<Integer>getPeopleWithSolvedTask(){
        Integer peopleWithSolvedTasks = service.getPeopleWithSolvedTasks();
        return new ResponseEntity<>(peopleWithSolvedTasks,HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<User>addUser(@RequestBody User user){
        User newUser = service.addUser(user);
        return new ResponseEntity<>(newUser,HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<User>updateUser(@PathVariable("id") int id, @RequestBody User user){
        User oldUser=service.findUserById(id);
        oldUser=service.updateUser(user);
        return new ResponseEntity<>(oldUser,HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id")int id){
        service.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}