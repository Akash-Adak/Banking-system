package com.banking.loan.event;

import com.banking.loan.event.LoanEventType;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class LoanEvent {
    private LoanEventType type;
    private Long loanId;
    private Long accountId;
    private BigDecimal amount;
    private String description;
}
