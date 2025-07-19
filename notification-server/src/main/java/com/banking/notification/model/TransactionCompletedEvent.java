package com.banking.notification.model;

import lombok.Data;

// TransactionCompletedEvent.java
@Data
public class TransactionCompletedEvent {
    private String email;
    private String phone;
    private String transactionId;
    private double amount;
    private String body;
}
