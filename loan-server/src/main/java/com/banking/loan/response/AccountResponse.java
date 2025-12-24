package com.banking.loan.response;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import jakarta.persistence.*;
import lombok.*;
@Data
@NoArgsConstructor
@AllArgsConstructor

public class AccountResponse {

        private String accountNumber;

        private String accountType;


        private Double balance;
        private String username;




}
