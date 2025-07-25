package com.banking.authentication.controller;


import com.banking.authentication.model.LoginRequest;
import com.banking.authentication.model.RegisterRequest;
import com.banking.authentication.repository.UserRepository;

import com.banking.authentication.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) throws Exception{

        if(userRepository.findByUsername(request.getUsername()).isPresent() ||
                userRepository.findByEmail(request.getEmail()).isPresent()||
         userRepository.findByPhone(request.getPhone()).isPresent()){
            throw new Exception("user already present");
        }
          String  res=  authService.register(request);
          return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) throws Exception{
        String s=authService.login(request);
       if(s==null)
           return new ResponseEntity<>("User not found! register first",HttpStatus.NOT_FOUND);
       return new ResponseEntity<>(s,HttpStatus.OK);
    }

}
