package com.banking.loan.controller;

import com.banking.loan.model.Loan;
import com.banking.loan.service.LoanService;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    private final LoanService loanService;

    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    @PostMapping("/apply")
    public Loan apply(@RequestParam Long userId,
                      @RequestParam BigDecimal amount,
                      @RequestParam int term) {
        return loanService.applyForLoan(userId, amount, term);
    }

    @PostMapping("/approve/{loanId}")
    public Loan approve(@PathVariable Long loanId) {
        return loanService.approveLoan(loanId);
    }

    @PostMapping("/close/{loanId}")
    public Loan close(@PathVariable Long loanId) {
        return loanService.closeLoan(loanId);
    }

    @GetMapping("/user/{userId}")
    public List<Loan> userLoans(@PathVariable Long userId) {
        return loanService.getLoansByUser(userId);
    }
}



