package com.banking.account.repository;

import com.banking.account.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
//    Account findByUserId(String userId);
    Account findByAccountNumber(String accountNumber);
    Optional<Account> findByUsername(String username);
}
