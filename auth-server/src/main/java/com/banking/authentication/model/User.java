package com.banking.authentication.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(unique = true)
    @NonNull
    private String username;

    @NonNull
    private String password;
    @NonNull
    private String roles;
    @NonNull
     private String phone;

    private String email;

}
