package com.banking.transaction.repository;

import com.banking.transaction.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByFromAccountOrToAccount(String from, String to);

    List<Transaction> findByFromAccount(String account);

//    List<Transaction> findBYAccount(String account);
}

