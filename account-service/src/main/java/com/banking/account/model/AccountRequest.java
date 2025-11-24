package com.banking.account.model;

public class AccountRequest {
    private AccountType type;  // ✅ Enum instead of String

    public AccountType getType() {
        return type;
    }

    public void setType(AccountType type) {
        this.type = type;
    }
}

