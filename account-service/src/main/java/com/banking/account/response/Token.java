package com.banking.account.response;

import lombok.Data;

@Data
public class Token {
    private String token;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
