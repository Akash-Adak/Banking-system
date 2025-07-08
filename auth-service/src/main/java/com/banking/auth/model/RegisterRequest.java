package com.banking.auth.model;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String role; // Optional: USER / ADMIN
}

