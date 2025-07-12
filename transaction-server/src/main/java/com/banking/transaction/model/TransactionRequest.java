package com.banking.transaction.model;

import lombok.Data;

@Data
public class TransactionRequest {
    private String fromAccount;
    private String toAccount;
    private Double amount;
    private String type; // TRANSFER, DEPOSIT, WITHDRAW
}

