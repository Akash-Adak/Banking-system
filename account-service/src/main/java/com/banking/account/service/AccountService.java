package com.banking.account.service;

import com.banking.account.model.Account;
import com.banking.account.repository.AccountRepository;
import com.banking.account.response.RegisterRequestResponse;
import com.banking.account.response.UserResponse;
import com.banking.account.response.Token;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;


import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;
@Service
@Slf4j
public class AccountService {
    @Autowired
    private  AccountRepository repository;


    @Autowired
   private  RestTemplate restTemplate;
    @Autowired
   private  KafkaProducerService kafkaProducerService;

    @Autowired
    private RedisTemplate redisTemplate;
    public Account createAccount(String username,String token) {

      if(repository.findByUsername(username).isPresent()) return null;
        Account account = new Account();

        account.setAccountNumber(generateBankAccountNumber());
        account.setBalance(1000.0);
        account.setUsername(username);

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

        ResponseEntity<UserResponse> response1 = restTemplate.exchange(
                "http://USER/api/users/{username}",
                HttpMethod.GET,
                entity,
                UserResponse.class,
               username
        );

        UserResponse userResponse= response1.getBody();


        RegisterRequestResponse event = new RegisterRequestResponse();
        event.setUsername(userResponse.getUsername());
        event.setEmail(userResponse.getEmail());
        event.setBody("🎉 Account Created Successfully! Dear " +userResponse.getFullname()+ ", your bank account has been created successfully. You can now view your account details, check your balance, and start making transactions. Thank you for choosing our bank!");
        String json = new Gson().toJson(event);
        kafkaProducerService.sendLoginSuccess("banking-users", json);
        return repository.save(account);
    }

    private String generateBankAccountNumber() {
        String bankCode = "8940";
        long randomPart = ThreadLocalRandom.current().nextLong(1000000000L, 9999999999L); // 10-digit number
        return bankCode + randomPart;
    }


    public Account getUserByAccountNumber(String accountNumber) {
        return repository.findByAccountNumber(accountNumber);
    }


    public boolean debit(String accountNumber, Double amount,String token) {
        Optional<Account> optional = Optional.ofNullable(repository.findByAccountNumber(accountNumber));
        if (optional.isPresent()) {
            Account account = optional.get();
            if (account.getBalance() >= amount) {
                account.setBalance(account.getBalance() - amount);
                repository.save(account);

                HttpHeaders headers = new HttpHeaders();
                headers.set("Authorization",token );

                HttpEntity<Void> entity = new HttpEntity<>(headers);

                ResponseEntity<UserResponse> response = restTemplate.exchange(
                        "http://USER/api/users/get-by-account/{accountNumber}",
                        HttpMethod.GET,
                        entity,
                        UserResponse.class,
                        accountNumber
                );
                UserResponse userResponse=response.getBody();
                RegisterRequestResponse event = new RegisterRequestResponse();
                event.setUsername(userResponse.getFullname());
                event.setEmail(userResponse.getEmail());
                event.setBody(
                        "💸 Amount Debited Successfully!\n\n" +
                                "₹" + amount + " has been debited from your account " + "xxxxxxxxxx"+accountNumber.substring(10,accountNumber.length()) + "\n\n" +
                                "Current Balance: ₹" + account.getBalance() + "\n" +
                                "Date: " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) + "\n\n" +
                                "Thank you for banking with us."
                );


                String json = new Gson().toJson(event);
                kafkaProducerService.sendLoginSuccess("banking-users", json);

                return true;
            }
        }
        return false;
    }

    public boolean credit(String accountNumber, Double amount, String token) {
        return Optional.ofNullable(repository.findByAccountNumber(accountNumber)).map(account -> {
            account.setBalance(account.getBalance() + amount);
            repository.save(account);
            log.info("Credited ₹{} to account {}", amount, accountNumber);

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", token);
            HttpEntity<Void> entity = new HttpEntity<>(headers);

            try {
                ResponseEntity<UserResponse> response = restTemplate.exchange(
                        "http://USER/api/users/get-by-account/{accountNumber}",
                        HttpMethod.GET,
                        entity,
                        UserResponse.class,
                        accountNumber
                );

                UserResponse userResponse = response.getBody();
                if (userResponse == null) {
                    log.error("User info missing in response for account {}", accountNumber);
                    return false;
                }

                RegisterRequestResponse event = new RegisterRequestResponse();
                event.setUsername(userResponse.getUsername());
                event.setEmail(userResponse.getEmail());
                event.setBody(
                        "💰 Amount Credited Successfully!\n\n" +
                                "₹" + amount + " has been credited to your account " + "xxxxxxxxxx"+accountNumber.substring(10,accountNumber.length())+ ".\n\n" +
                                "Current Balance: ₹" + account.getBalance() + "\n" +
                                "Date: " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) + "\n\n" +
                                "Thank you for banking with us."
                );

                String json = new Gson().toJson(event);
                kafkaProducerService.sendLoginSuccess("banking-users", json);

                return true;

            } catch (HttpClientErrorException | HttpServerErrorException ex) {
                log.error("Failed to fetch user info for account {}: {}", accountNumber, ex.getMessage());
                return false;
            }

        }).orElse(false);
    }


}
