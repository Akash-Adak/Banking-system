package com.banking.notification.service;

import com.banking.notification.model.AccountCreatedEvent;
import com.banking.notification.model.TransactionCompletedEvent;
import com.banking.notification.model.UserRegisteredEvent;
import com.banking.notification.service.EmailService;
import com.banking.notification.service.SmsService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private EmailService emailService;
    @Autowired private SmsService smsService;

    public void processUserRegistered(String message) {
        UserRegisteredEvent event = new Gson().fromJson(message, UserRegisteredEvent.class);
//        try {
//            JSONObject obj = new JSONObject(message);
//            String phone = obj.getString("phone");
//            String username = obj.getString("username");
//
//            String message1 = "Hi " + username + ", welcome to our platform!";
//            smsService.sendSms(phone, message1);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
        emailService.sendEmail(event.getEmail(),event.getUsername(),event.getBody());

    }

    public void processAccountCreated(String message) {
        AccountCreatedEvent event = new Gson().fromJson(message, AccountCreatedEvent.class);
        emailService.sendEmail(event.getEmail(), event.getAccountNumber(),event.getBody());

    }

    public void processTransaction(String message) {
        TransactionCompletedEvent event = new Gson().fromJson(message, TransactionCompletedEvent.class);
        emailService.sendEmail(event.getEmail(), String.valueOf(event.getAmount()),event.getBody());

    }
}
