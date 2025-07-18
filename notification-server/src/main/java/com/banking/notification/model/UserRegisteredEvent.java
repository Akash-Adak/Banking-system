package com.banking.notification.model;

import lombok.Data;

// UserRegisteredEvent.java
@Data
public class UserRegisteredEvent {
    private String email;
    private String phone;
    private String username;
}
