package com.banking.account.controller;

import com.banking.account.service.AccountService;
import com.banking.account.model.Account;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService service;

    @PostMapping
    public ResponseEntity<Account> createAccount(HttpServletRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        String token = request.getHeader("Authorization"); // Get the token from incoming request

        return ResponseEntity.ok(service.createAccount(username, token));
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<Account> getAccountByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(service.getAccountByUserId(userId));
    }
}

