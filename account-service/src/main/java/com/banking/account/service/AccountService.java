package com.banking.account.service;

import com.banking.account.controller.UserdetailsService;
import com.banking.account.model.Account;
import com.banking.account.repository.AccountRepository;
import com.banking.account.response.UserResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestOperations;
import org.springframework.web.client.RestTemplate;


import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;
@Service

public class AccountService {
    @Autowired
    private  AccountRepository repository;


    @Autowired
   private  RestTemplate restTemplate;

    public Account createAccount(String username,String token) {

        Account account = new Account();

        account.setAccountNumber(generateBankAccountNumber());
        account.setBalance(1000.0);


        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<UserResponse> response = restTemplate.exchange(
                "http://USER/api/users/{accountNumber}",
                HttpMethod.PUT,
                entity,
                UserResponse.class,
                account.getAccountNumber()
        );

        return repository.save(account);
    }

    private String generateBankAccountNumber() {
        String bankCode = "8940";
        long randomPart = ThreadLocalRandom.current().nextLong(1000000000L, 9999999999L); // 10-digit number
        return bankCode + randomPart;
    }



    public Account getAccountByUserId(String accountNumber) {

        return repository.findByAccountNumber(accountNumber);
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
