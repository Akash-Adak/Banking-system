package com.banking.user.service;

import com.banking.user.model.User;
import org.springframework.http.HttpStatusCode;

import java.util.Optional;

public interface UserService {
    User createUser(User user);
    Optional<User> getUserByUsername(String username);

    User UpdateUser(User user);

//    void accountCreation(String Username);
}
