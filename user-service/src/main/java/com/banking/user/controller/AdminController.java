package com.banking.user.controller;

import com.banking.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;
    @GetMapping("/getAll")
    public ResponseEntity<?>  getAll(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        String username = auth.getName();
        List<String> roles = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        System.out.println("Username: " + username);
        System.out.println("Roles: " + roles);

        return new ResponseEntity<>(userRepository.findAll(), HttpStatus.FOUND);
    }
}
