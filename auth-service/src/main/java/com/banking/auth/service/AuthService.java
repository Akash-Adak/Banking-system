package com.banking.auth.service;

import com.banking.auth.model.*;
import com.banking.auth.repository.UserRepository;
import com.banking.auth.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public String register(RegisterRequest request) {
        var user = User.builder()
                .username(request.getUsername())
                .password(encoder.encode(request.getPassword()))
                .roles(request.getRole() != null ? request.getRole() : "USER")
                .build();
        repo.save(user);
        return jwtUtil.generateToken(user.getUsername(), user.getRoles());
    }

    public String login(LoginRequest request) {
        var user = repo.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(request.getPassword(), user.getPassword()))
            throw new RuntimeException("Invalid credentials");

        return jwtUtil.generateToken(user.getUsername(), user.getRoles());

    }

    public List<User> getUserDetails() {
       List<User> list=repo.findAll();
       return list;
    }
}
