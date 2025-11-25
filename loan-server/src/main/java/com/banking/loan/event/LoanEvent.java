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

    public LoanEventType getType() {
        return type;
    }

    public void setType(LoanEventType type) {
        this.type = type;
    }

    public Long getLoanId() {
        return loanId;
    }

    public void setLoanId(Long loanId) {
        this.loanId = loanId;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    private Long accountId;
    private BigDecimal amount;
    private String description;
}
