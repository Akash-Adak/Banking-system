package com.banking.loan.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class LoanRequestDto {

    @NotNull
    private String accountNumber;

    @NotNull
    private LoanType loanType;

    @NotNull
    @Min(1)
    private BigDecimal principalAmount;

    @Min(1)
    private double interestRate;

    @Min(1)
    private int tenureMonths;
}

