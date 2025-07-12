package com.banking.transaction.model;

import lombok.Data;

@Data
public class UserResponse {
    private Long id;
    private String username;
    private String fullname;
    private String email;
    private String phone;
    private String address;
    private String kycStatus;
}
