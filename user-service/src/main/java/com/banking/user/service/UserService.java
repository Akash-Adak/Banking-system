package com.banking.user.service;

import com.banking.user.model.User;
import com.banking.user.repository.UserRepository;
import com.banking.user.response.RegisterRequestResponse;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
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
        event.setUsername(user.getUsername());
        event.setEmail(user.getEmail());
        event.setBody("User details update Successfully 🎉🎉");

        String json = new Gson().toJson(event);
        kafkaProducerService.sendUserRegistered("banking-users", json);
        return userRepository.save(old);

    }


    public List<User> getAll() {

      List<User> list=userRepository.findAll();
      return list;
    }


    public void addAccountNumber(String accountNumber) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println(username);
              User old = userRepository.findByUsername(username).orElseThrow();
              old.setEmail(old.getEmail());
              old.setAddress(old.getAddress());
              old.setPhone(old.getPhone());
              old.setKycStatus(old.getKycStatus());
              old.setFullname(old.getFullname());
              old.setAccountNumber(accountNumber);
              userRepository.save(old);
    }
}
