package com.banking.notification.model;

import lombok.Data;

@Data
public class Notification {

    private String to;
    private String subject;
    private String text;
}
