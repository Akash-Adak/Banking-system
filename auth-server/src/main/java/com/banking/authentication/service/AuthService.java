package com.banking.authentication.service;

import com.banking.authentication.Exception.RunTimeException;
import com.banking.authentication.config.JwtUtil;
import com.banking.authentication.model.LoginRequest;
import com.banking.authentication.model.RegisterRequest;
import com.banking.authentication.model.User;
import com.banking.authentication.model.Userdto;
import com.banking.authentication.repository.UserRepository;
import com.banking.authentication.response.RegisterRequestResponse;
import com.banking.authentication.response.UserResponse;
import com.google.gson.Gson;

import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;

import java.util.Map;

@Service

public class AuthService {

    private final  UserRepository repo;

    private final PasswordEncoder encoder;

    private final JwtUtil jwtUtil;

    private final RestTemplate restTemplate;

    private final KafkaProducerService kafkaProducerService;

    public AuthService(UserRepository repo, PasswordEncoder encoder, JwtUtil jwtUtil, RestTemplate restTemplate, KafkaProducerService kafkaProducerService) {
        this.repo = repo;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
        this.restTemplate = restTemplate;
        this.kafkaProducerService = kafkaProducerService;
    }

    public String register(RegisterRequest request) throws Exception {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPhone(request.getPhone());
        user.setPassword(encoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setRoles(request.getRole() != null ? request.getRole() : "USER");

        Map<String, Object> claims = new HashMap<>();
        claims.put("username", user.getUsername());
        claims.put("role", user.getRoles());

        String token = jwtUtil.generateToken(claims, user.getUsername());

        // ✅ FIX: Add JSON content type
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + token);

        Userdto dto = new Userdto(user.getUsername(), user.getPhone(), user.getEmail());
        HttpEntity<Userdto> entity = new HttpEntity<>(dto, headers);

        // ✅ Ensure RestTemplate bean is properly configured
        ResponseEntity<UserResponse> response = restTemplate.exchange(
                "http://USER/api/users/create-user",
                HttpMethod.POST,
                entity,
                UserResponse.class
        );

        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
            throw new RunTimeException("Failed to create user in user-service");
        }

        repo.save(user);

        RegisterRequestResponse event = new RegisterRequestResponse();
        String username = request.getUsername();
        String userEmail = request.getEmail();

// Email subject
        String subject = "Welcome to EFB, " + username + "!";

// HTML Email body
        String body = "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "  <meta charset='UTF-8'>" +
                "  <style>" +
                "    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }" +
                "    .container { background-color: #ffffff; padding: 20px; margin: 30px auto; width: 90%; max-width: 600px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }" +
                "    .header { background-color: #0046be; color: white; padding: 15px; border-radius: 10px 10px 0 0; text-align: center; }" +
                "    .content { padding: 20px; color: #333333; line-height: 1.6; }" +
                "    .footer { text-align: center; font-size: 12px; color: #888888; padding-top: 15px; }" +
                "    .button { display: inline-block; padding: 10px 20px; margin-top: 20px; background-color: #0046be; color: white; text-decoration: none; border-radius: 5px; }" +
                "  </style>" +
                "</head>" +
                "<body>" +
                "  <div class='container'>" +
                "    <div class='header'>" +
                "  <img src='https://drive.google.com/file/d/13hFniB-moq7IQEjsqXJLRgUT9cfYqr9p/view?usp=drive_link' alt='EFB Logo' class='logo'>" +
                "      <h1>Welcome to EFB 🎉</h1>" +
                "    </div>" +
                "    <div class='content'>" +
                "      <p>Hello <strong>" + username + "</strong>,</p>" +
                "      <p>You have successfully registered with <strong>EFB – Equinox Finance Bank</strong>.</p>" +
                "      <p>You can now access your account and start using our services.</p>" +
                "      <a href='#' class='button'>Go to Your Dashboard</a>" +
                "      <p>If you did not register for EFB, please ignore this email.</p>" +
                "    </div>" +
                "    <div class='footer'>" +
                "      &copy; 2025 EFB – Equinox Finance Bank. All rights reserved." +
                "    </div>" +
                "  </div>" +
                "</body>" +
                "</html>";

// Set email event
        event.setUsername(subject); // Subject
        event.setEmail(userEmail);  // Recipient email
        event.setBody(body);        // HTML email body


        String json = new Gson().toJson(event);
        kafkaProducerService.sendUserRegistered("banking-users", json);

        return token;
    }


    public String login(LoginRequest request) throws Exception {
        var user = repo.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(request.getPassword(), user.getPassword()))
            throw new RunTimeException("Invalid credentials");
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", user.getUsername());
        claims.put("role", user.getRoles());

        RegisterRequestResponse event = new RegisterRequestResponse();


        String username = user.getUsername();
        String userEmail = user.getEmail();

// Email subject
        String subject = "Login Successful – Welcome Back, " + username + "!";

// HTML Email body with logo
        String body = "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "  <meta charset='UTF-8'>" +
                "  <style>" +
                "    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }" +
                "    .container { background-color: #ffffff; padding: 20px; margin: 30px auto; width: 90%; max-width: 600px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }" +
                "    .header { background-color: #0046be; color: white; padding: 15px; border-radius: 10px 10px 0 0; text-align: center; }" +
                "    .logo { max-width: 100px; margin-bottom: 10px; }" +
                "    .content { padding: 20px; color: #333333; line-height: 1.6; }" +
                "    .footer { text-align: center; font-size: 12px; color: #888888; padding-top: 15px; }" +
                "    .button { display: inline-block; padding: 10px 20px; margin-top: 20px; background-color: #0046be; color: white; text-decoration: none; border-radius: 5px; }" +
                "  </style>" +
                "</head>" +
                "<body>" +
                "  <div class='container'>" +
                "    <div class='header'>" +
                "      <img src='https://drive.google.com/file/d/13hFniB-moq7IQEjsqXJLRgUT9cfYqr9p/view?usp=drive_link' alt='EFB Logo' class='logo'>" +
                "      <h1>Login Successful 🎉</h1>" +
                "    </div>" +
                "    <div class='content'>" +
                "      <p>Hello <strong>" + username + "</strong>,</p>" +
                "      <p>You have successfully logged into <strong>EFB – Equinox Finance Bank</strong>.</p>" +
                "      <p>Access your dashboard and manage your account securely.</p>" +
                "      <a href='#' class='button'>Go to Dashboard</a>" +
                "      <p>If this was not you, please reset your password immediately.</p>" +
                "    </div>" +
                "    <div class='footer'>" +
                "      &copy; 2025 EFB – Equinox Finance Bank. All rights reserved." +
                "    </div>" +
                "  </div>" +
                "</body>" +
                "</html>";

// Prepare event object
        event.setUsername(subject); // Email subject
        event.setEmail(userEmail);  // Recipient email
        event.setBody(body);        // HTML email body
        event.setContentType("text/html");
// Convert to JSON
        String json = new Gson().toJson(event);

// json now contains the full HTML email with subject, ready to send

        kafkaProducerService.sendLoginSuccess("banking-users", json);

        return jwtUtil.generateToken(claims, user.getUsername());

    }

}

