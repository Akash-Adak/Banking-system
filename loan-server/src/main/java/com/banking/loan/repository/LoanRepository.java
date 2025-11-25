package com.banking.loan.repository;



import com.banking.loan.model.Loan;
import com.banking.loan.model.LoanStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoanRepository extends JpaRepository<Loan, Long> {

    List<Loan> findByAccountNumber(String accountNumber);

    List<Loan> findByAccountNumberAndStatus(String accountNumber, LoanStatus status);
}

