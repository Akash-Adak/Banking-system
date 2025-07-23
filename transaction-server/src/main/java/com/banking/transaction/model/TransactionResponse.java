package com.banking.transaction.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class TransactionResponse {
    private String status;
    private String message;
    private Long transactionId;

    public TransactionResponse(String status, String message, Long transactionId) {
        this.status = status;
        this.message = message;
        this.transactionId = transactionId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }
}
