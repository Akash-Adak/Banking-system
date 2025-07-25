package com.banking.user.controller;

//import com.banking.user.kafka.KafkaProducer;
import com.banking.user.model.User;
import com.banking.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/create-user")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        String jwtUsername = SecurityContextHolder.getContext().getAuthentication().getName();

        if (!jwtUsername.equals(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("You cannot create a user for someone else.");
        }

       User saved= userService.createUser(user);

        return new ResponseEntity<>(saved,HttpStatus.CREATED);
    }



    @GetMapping("/{username}")
    public ResponseEntity<?> getUser(@PathVariable String username) {
        String jwtUsername = SecurityContextHolder.getContext().getAuthentication().getName();

        if (!jwtUsername.equals(username)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("You cannot create a user for someone else.");
        }
        return userService.getUserByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping
    public ResponseEntity<?> UpdateUser(@RequestBody User user) {
        String jwtUsername = SecurityContextHolder.getContext().getAuthentication().getName();

        if (!jwtUsername.equals(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("You cannot create a user for someone else.");
        }

        User saved= userService.UpdateUser(user);

        return new ResponseEntity<>(saved,HttpStatus.OK);
    }

    @PutMapping("/{accountNumber}")
    public void addAccount(@PathVariable String accountNumber){

        userService.addAccountNumber(accountNumber);
 }
}
