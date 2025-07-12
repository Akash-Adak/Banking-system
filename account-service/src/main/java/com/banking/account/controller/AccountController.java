package com.banking.account.controller;

import com.banking.account.model.BalanceUpdateRequest;
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

    private final AccountService accountService;

    @PostMapping
    public ResponseEntity<Account> createAccount(HttpServletRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        String token = request.getHeader("Authorization"); // Get the token from incoming request

        return ResponseEntity.ok(accountService.createAccount(username, token));
    }


    @GetMapping("/user/{accountNumber}")
    public ResponseEntity<Account> getAccountByUserId(@PathVariable String accountNumber) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        return ResponseEntity.ok(accountService.getAccountByUserId(accountNumber));
    }
    @PostMapping("/debit")
    public ResponseEntity<String> debit(@RequestBody BalanceUpdateRequest request) {
        boolean success = accountService.debit(request.getAccountNumber(), request.getAmount());
        if (success) {
            return ResponseEntity.ok("Debited successfully");
        } else {
            return ResponseEntity.badRequest().body("Insufficient funds or account not found");
        }
    }

    @PostMapping("/credit")
    public ResponseEntity<String> credit(@RequestBody BalanceUpdateRequest request) {
        boolean success = accountService.credit(request.getAccountNumber(), request.getAmount());
        if (success) {
            return ResponseEntity.ok("Credited successfully");
        } else {
            return ResponseEntity.badRequest().body("Account not found");
        }
    }

}

