package com.banking.account.service;

import com.banking.account.model.Account;
import com.banking.account.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository repository;

    public Account createAccount(Account account) {
        String userId = "BANK" + ThreadLocalRandom.current().nextInt(100000, 999999);
            account.setUserId(userId);
            String an=generateBankAccountNumbe();
            account.setAccountNumber(an);
            account.setBalance(0.0);
         repository.save(account);

         return account;
    }

    public Account getAccountByUserId(String userId) {
        return repository.findByUserId(userId);
    }
    public String generateBankAccountNumbe() {
        String bankCode = "8940"; // can be static per your bank
        long randomNumber = ThreadLocalRandom.current().nextLong(1000000000L, 9999999999L);
        return bankCode + randomNumber;
    }

}
