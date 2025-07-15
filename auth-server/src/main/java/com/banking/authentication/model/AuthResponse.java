package com.banking.authentication.model;

import lombok.Data;

@Data
public class AuthResponse {
    private String token;

    public AuthResponse(String register) {
        this.token=register;
    }
}
