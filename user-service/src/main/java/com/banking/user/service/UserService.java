package com.banking.user.service;

import com.banking.user.model.User;
import com.banking.user.repository.UserRepository;
import com.banking.user.response.RegisterRequestResponse;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private  KafkaProducerService kafkaProducerService;


    public User createUser(User user) {


        return userRepository.save(user);
    }


    public Optional<User> getUserByUsername(String username) {

        return userRepository.findByUsername(username);
    }

    public User UpdateUser(User user) {
            User old=userRepository.findByUsername(user.getUsername()).orElseThrow();
            old.setEmail(user.getEmail());
            old.setAddress(user.getAddress());
            old.setPhone(user.getPhone());
            old.setKycStatus(user.getKycStatus());
            old.setFullname(user.getFullname());

        RegisterRequestResponse event = new RegisterRequestResponse();
        String fullname = user.getUsername();
        String email = user.getEmail();
        String subject = "✅ Your Account Details Updated Successfully";

// HTML Email body
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
                "    .highlight { font-weight: bold; color: #0046be; }" +
                "  </style>" +
                "</head>" +
                "<body>" +
                "  <div class='container'>" +
                "    <div class='header'>" +
                "      <img src='https://drive.google.com/file/d/13hFniB-moq7IQEjsqXJLRgUT9cfYqr9p/view?usp=drive_link' alt='EFB Logo' class='logo'>" +
                "      <h1>Account Updated 🎉</h1>" +
                "    </div>" +
                "    <div class='content'>" +
                "      <p>Hello <strong>" + fullname + "</strong>,</p>" +
                "      <p>Your account details have been updated successfully.</p>" +
                "      <p>You can now review your updated information in your <strong>EFB – Equinox Finance Bank</strong> dashboard.</p>" +
                "      <p>If you did not make this update, please contact our support immediately.</p>" +
                "    </div>" +
                "    <div class='footer'>" +
                "      &copy; 2025 EFB – Equinox Finance Bank. All rights reserved." +
                "    </div>" +
                "  </div>" +
                "</body>" +
                "</html>";

// Set event for Kafka or email sending
        event.setUsername(subject); // Email subject
        event.setEmail(email);      // Recipient email
        event.setBody(body);        // HTML email body


        String json = new Gson().toJson(event);
        kafkaProducerService.sendUserRegistered("banking-users", json);
        return userRepository.save(old);

    }


    public List<User> getAll() {

      List<User> list=userRepository.findAll();
      return list;
    }


    public User addAccountNumber(String username, String accountNumber) {
        User old = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));

        old.setAccountNumber(accountNumber);
        return userRepository.save(old);
    }

    public Optional<User> getuserbyaccountnumber(String accountNumber) {

        return userRepository.findByAccountNumber(accountNumber);
    }
}
