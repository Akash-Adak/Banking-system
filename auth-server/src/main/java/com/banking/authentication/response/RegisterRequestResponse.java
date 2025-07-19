package com.banking.authentication.response;

import lombok.Data;

@Data
public class RegisterRequestResponse {
    private String username;
    private String email;
    private String phone;
    private String body;
}
