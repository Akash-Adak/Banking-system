package com.banking.authentication.response;

import lombok.Data;
@Data
public class UserResponse {
    private String username;// USER or ADMIN
    private String phone;
    private String email;

}
