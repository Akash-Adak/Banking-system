package com.banking.authentication.service;

import com.banking.authentication.config.JwtUtil;
import com.banking.authentication.model.LoginRequest;
import com.banking.authentication.model.RegisterRequest;
import com.banking.authentication.model.User;
import com.banking.authentication.model.Userdto;
import com.banking.authentication.repository.UserRepository;
import com.banking.authentication.response.RegisterRequestResponse;
import com.banking.authentication.response.UserResponse;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service

public class AuthService {
    @Autowired
    private  UserRepository repo;
    @Autowired
    private  PasswordEncoder encoder;
    @Autowired
    private  JwtUtil jwtUtil;
    @Autowired
    private  RestTemplate restTemplate;
    @Autowired
    private  KafkaProducerService kafkaProducerService;
    public String register(RegisterRequest request) throws Exception{
        User user=new User();
        user.setUsername(request.getUsername());
        user.setPhone(request.getPhone());
        user.setPassword(encoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setRoles(request.getRole()!=null ? request.getRole():"USER");
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", user.getUsername());
        claims.put("role", user.getRoles());

        String token= jwtUtil.generateToken(claims, user.getUsername());

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        Userdto dto=new Userdto(user.getUsername(),user.getPhone(),user.getEmail());
        HttpEntity<Userdto> entity = new HttpEntity<>(dto, headers);

        ResponseEntity<UserResponse> response = restTemplate.exchange(
                "http://USER/api/users/create-user",
                HttpMethod.POST,
                entity,
                UserResponse.class
        );

        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
            throw new RuntimeException("Failed to create user in user-service");
        }

        repo.save(user);

        RegisterRequestResponse event = new RegisterRequestResponse();
        event.setUsername(request.getUsername());
        event.setEmail(request.getEmail());
        event.setBody("User Register Successfully 🎉🎉");

        String json = new Gson().toJson(event);
        kafkaProducerService.sendUserRegistered("user-registered", json);


        return token;
    }

    public String login(LoginRequest request) throws Exception {
        var user = repo.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(request.getPassword(), user.getPassword()))
            throw new RuntimeException("Invalid credentials");
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", user.getUsername());
        claims.put("role", user.getRoles());

        RegisterRequestResponse event = new RegisterRequestResponse();
        event.setUsername(user.getUsername());
        event.setEmail(user.getEmail());
        event.setBody("Login Successfully");
        String json = new Gson().toJson(event);
        kafkaProducerService.sendLoginSuccess("user-registered", json);

        return jwtUtil.generateToken(claims, user.getUsername());

    }

}

