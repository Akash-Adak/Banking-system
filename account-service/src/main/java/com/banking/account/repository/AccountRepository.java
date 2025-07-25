package com.banking.account.repository;

import com.banking.account.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {
//    Account findByUserId(String userId);
    Account findByAccountNumber(String accountNumber);
}
