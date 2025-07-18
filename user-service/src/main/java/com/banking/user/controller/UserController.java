package com.banking.user.controller;

//import com.banking.user.kafka.KafkaProducer;
import com.banking.user.service.UserService;
import com.banking.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
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

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllUsers() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String roles = String.valueOf(auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList());

        if (!roles.equals("ADMIN")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("You cannot access user details");
        }
       return new ResponseEntity<>(userService.getAll(),HttpStatus.FOUND);
    }

}
