package com.banking.loan.model;// src/main/java/com/bms/loanservice/dto/LoanResponseDto.java

import com.banking.loan.model.LoanStatus;
import com.banking.loan.model.LoanType;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class LoanResponseDto {

    private Long id;
    private String accountNumber;
    private LoanType loanType;
    private BigDecimal principalAmount;
    private double interestRate;
    private int tenureMonths;
    private BigDecimal emiAmount;
    private LoanStatus status;
    private LocalDate startDate;
    private LocalDate endDate;
}
