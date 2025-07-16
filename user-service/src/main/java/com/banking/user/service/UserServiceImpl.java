package com.banking.user.service;

import com.banking.user.model.User;
import com.banking.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User createUser(User user) {

        return userRepository.save(user);
    }

    @Override
    public Optional<User> getUserByUsername(String username) {

        return userRepository.findByUsername(username);
    }

    @Override
    public User UpdateUser(User user) {
//        user.setUsername(user.getUsername());

            User old=userRepository.findByUsername(user.getUsername()).orElseThrow();
            old.setEmail(user.getEmail());
            old.setAddress(user.getAddress());
            old.setPhone(user.getPhone());
            old.setKycStatus(user.getKycStatus());
            old.setFullname(user.getFullname());
            return userRepository.save(old);

    }

    @Override
    public List<User> getAll() {

      List<User> list=userRepository.findAll();
      return list;
    }

//    @Override
//    public void accountCreation(String username) {
//
//    }


}
