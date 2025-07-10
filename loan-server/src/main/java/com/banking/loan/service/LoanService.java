package com.banking.loan.service;

import com.banking.loan.kafka.LoanEventProducer;
import com.banking.loan.model.*;
import com.banking.loan.repository.LoanRepository;
//import com.banking.loan.kafka.LoanEventProducer;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class LoanService {

    private final LoanRepository loanRepository;
    private final LoanEventProducer eventProducer;

    public LoanService(LoanRepository loanRepository, LoanEventProducer eventProducer) {
        this.loanRepository = loanRepository;
        this.eventProducer = eventProducer;
    }

    public Loan applyForLoan(Long userId, BigDecimal amount, int term) {
        Loan loan = Loan.builder()
                .userId(userId)
                .amount(amount)
                .termInMonths(term)
                .interestRate(new BigDecimal("7.5"))
                .status(LoanStatus.PENDING)
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusMonths(term))
                .build();
        loan = loanRepository.save(loan);
        eventProducer.sendLoanEvent("loan-applied", loan);
        return loan;
    }

    public Loan approveLoan(Long loanId) {
        Loan loan = loanRepository.findById(loanId).orElseThrow();
        loan.setStatus(LoanStatus.APPROVED);
        loanRepository.save(loan);
        eventProducer.sendLoanEvent("loan-approved", loan);
        return loan;
    }

    public List<Loan> getLoansByUser(Long userId) {
        return loanRepository.findByUserId(userId);
    }

    public Loan closeLoan(Long loanId) {
        Loan loan = loanRepository.findById(loanId).orElseThrow();
        loan.setStatus(LoanStatus.CLOSED);
        loanRepository.save(loan);
        eventProducer.sendLoanEvent("loan-closed", loan);
        return loan;
    }
}
