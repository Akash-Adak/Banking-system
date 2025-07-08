package com.banking.auth.controller;

import com.banking.auth.model.*;
import com.banking.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {


    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
          String  res=  authService.register(request);
          return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
       if(!authService.login(request))
           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
       return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/user-details")
    public ResponseEntity<List<User>> getDetails(){
        List<User> user=authService.getUserDetails();
       return new ResponseEntity<>(user,HttpStatus.FOUND);

    }
}
