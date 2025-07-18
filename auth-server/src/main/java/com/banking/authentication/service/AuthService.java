package com.banking.authentication.service;

import com.banking.authentication.config.JwtUtil;
import com.banking.authentication.model.LoginRequest;
import com.banking.authentication.model.RegisterRequest;
import com.banking.authentication.model.User;
import com.banking.authentication.model.Userdto;
import com.banking.authentication.repository.UserRepository;
import com.banking.authentication.response.UserResponse;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
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

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;
    private final RestTemplate restTemplate;
    private final KafkaProducerService kafkaProducerService;
    public String register(RegisterRequest request) throws Exception{
        var user = User.builder()
                .username(request.getUsername())
                .password(encoder.encode(request.getPassword()))
                .roles(request.getRole() != null ? request.getRole() : "USER")
                .phone(request.getPhone())
                .build();
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", user.getUsername());
        claims.put("role", user.getRoles());

        String token= jwtUtil.generateToken(claims, user.getUsername());
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        Userdto dto=new Userdto(user.getUsername(),user.getPhone());
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

        RegisterRequest event = new RegisterRequest();
        event.setUsername(user.getUsername());
//        event.setEmail("akash@example.com");
        event.setPhone(user.getPhone());

        String json = new Gson().toJson(event);
        kafkaProducerService.sendMessage("user-registered", json);


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
        return jwtUtil.generateToken(claims, user.getUsername());

    }

    public List<User> getUserDetails() {
       List<User> list=repo.findAll();
       return list;
    }
}
