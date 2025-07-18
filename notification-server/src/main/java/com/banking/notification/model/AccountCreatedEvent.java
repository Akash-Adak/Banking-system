package com.banking.notification.model;

import lombok.Data;

// AccountCreatedEvent.java
@Data
public class AccountCreatedEvent {
    private String email;
    private String phone;
    private String accountNumber;
}
