package com.banking.transaction.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TransactionResponse {
    private String status;
    private String message;
    private Long transactionId;
}
