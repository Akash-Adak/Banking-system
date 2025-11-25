package com.banking.loan.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class RepaymentDto {

    @NotNull
    private Long loanId;

    @NotNull
    @Min(1)
    private BigDecimal amountPaid;
}
