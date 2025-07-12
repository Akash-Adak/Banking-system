package com.banking.account.service;

import com.banking.account.controller.UserdetailsService;
import com.banking.account.model.Account;
import com.banking.account.repository.AccountRepository;
import com.banking.account.response.UserResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestOperations;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;
@Slf4j
@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository repository;

   private final RestTemplate restTemplate;
    public Account createAccount(String username,String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<UserResponse> response = restTemplate.exchange(
                "http://USER/api/users/{username}",
                HttpMethod.GET,
                entity,
                UserResponse.class,
                username
        );

        UserResponse userResponse = response.getBody();
            log.info("name :",userResponse.getFullname());
        // 2. Create and save account
        Account account = new Account();
        account.setUserId("BANK" + ThreadLocalRandom.current().nextInt(100000, 999999));
        account.setAccountNumber(generateBankAccountNumber());
        account.setBalance(5000.0);
        account.setName(userResponse.getFullname()); // if Account has name field

        return repository.save(account);
    }

    private String generateBankAccountNumber() {
        String bankCode = "8940"; // fixed code for your bank/system
        long randomPart = ThreadLocalRandom.current().nextLong(1000000000L, 9999999999L); // 10-digit number
        return bankCode + randomPart;
    }



    public Account getAccountByUserId(String accountNumber) {

        return repository.findByAccountNumber(accountNumber);
    }
    public String generateBankAccountNumbe() {
        String bankCode = "8940"; // can be static per your bank
        long randomNumber = ThreadLocalRandom.current().nextLong(1000000000L, 9999999999L);
        return bankCode + randomNumber;
    }

    public boolean debit(String accountNumber, Double amount) {
        Optional<Account> optional = Optional.ofNullable(repository.findByAccountNumber(accountNumber));
        if (optional.isPresent()) {
            Account account = optional.get();
            if (account.getBalance() >= amount) {
                account.setBalance(account.getBalance() - amount);
                repository.save(account);
                return true;
            }
        }
        return false;
    }

    public boolean credit(String accountNumber, Double amount) {
        Optional<Account> optional = Optional.ofNullable(repository.findByAccountNumber(accountNumber));
        if (optional.isPresent()) {
            Account account = optional.get();
            account.setBalance(account.getBalance() + amount);
            repository.save(account);
            return true;
        }
        return false;
    }


}
