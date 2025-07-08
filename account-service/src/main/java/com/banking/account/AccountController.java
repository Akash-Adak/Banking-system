package com.banking.account;

import com.banking.account.Account;
import com.banking.account.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService service;

    @PostMapping
    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
        return ResponseEntity.ok(service.createAccount(account));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Account> getAccountByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(service.getAccountByUserId(userId));
    }
}
