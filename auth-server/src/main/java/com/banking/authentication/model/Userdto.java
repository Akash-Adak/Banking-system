package com.banking.authentication.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class Userdto {
    private String username;
  // USER or ADMIN
    private String phone;
    private String email;

    public Userdto(String username, String phone, String email) {
        this.username = username;
        this.phone = phone;
        this.email = email;
    }
}
