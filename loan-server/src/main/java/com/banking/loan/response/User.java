package com.banking.loan.response;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
public class User {
    private Long id;

    private String username;

    private String fullname;
    private String email;
    private String phone;
    private String address;
    private String kycStatus; // PENDING, VERIFIED, REJECTED

    private String accountNumber;

}

