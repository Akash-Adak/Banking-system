package com.banking.user.controller;

//import com.banking.user.kafka.KafkaProducer;
import com.banking.user.model.User;
import com.banking.user.service.RedisService;
import com.banking.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RedisService redisService;

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
                    .body("You cannot access another user's data.");
        }

        User cachedUser = redisService.get(username, User.class);
        if (cachedUser != null) {
            System.out.println("✅ Retrieved from Redis");
            return new ResponseEntity<>(cachedUser, HttpStatus.OK);
        }

        Optional<User> users = userService.getUserByUsername(username);
        if (users.isPresent()) {
            User userObj = users.get();
            redisService.set(username, userObj, 3600L);
            return new ResponseEntity<>(userObj, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
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

//    @PutMapping("/{accountNumber}")
//    public ResponseEntity<?> addAccount(@PathVariable String accountNumber){
//
//        return  ResponseEntity.ok(userService.addAccountNumber(accountNumber));
//    }

    @PatchMapping("/{username}/addAccountNumber/{accountNumber}")
    public ResponseEntity<?> addAccountNumber( @PathVariable String username,@PathVariable String accountNumber){

        return  ResponseEntity.ok(userService.addAccountNumber(username,accountNumber));
    }


    @GetMapping("/get-by-account/{accountNumber}")
    public ResponseEntity<?> getByAccountnimber(@PathVariable String accountNumber){
//        String jwtUsername = SecurityContextHolder.getContext().getAuthentication().getName();
//
//        if (!jwtUsername.equals(user.getUsername())) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                    .body("You cannot create a user for someone else.");
//        }
       Optional<User> user= userService.getuserbyaccountnumber(accountNumber);
       if(user.isPresent()) return new ResponseEntity<>(user,HttpStatus.FOUND);

       return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


}
