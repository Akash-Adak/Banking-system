package com.banking.authentication.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class Userdto {
    private String username;
  // USER or ADMIN
    private String phone;

    public Userdto(String username, String phone) {
        this.username=username;
        this.phone=phone;
    }
}
