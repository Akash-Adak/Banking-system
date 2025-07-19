package com.banking.authentication.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class RegisterRequest {
    private String username;
    private String password;
    private String email;
    private String role; // Optional: USER / ADMIN
    private String phone;
}

