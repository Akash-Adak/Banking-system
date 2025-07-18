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
        System.out.println("message received"+ message);
        try {
            JSONObject obj = new JSONObject(message);
            String phone = obj.getString("phone");
            String username = obj.getString("username");

            String message1 = "Hi " + username + ", welcome to our platform!";
            smsService.sendSms(phone, message1);
        } catch (Exception e) {
            e.printStackTrace();
        }
//        emailService.sendEmail(event.getEmail(), "Welcome!", "Thanks " + event.getUsername());
        try {
            JSONObject obj = new JSONObject(message);
            String phone = obj.getString("phone");
            String username = obj.getString("username");

            String message1 = "Hi " + username + ", welcome to our platform!";
            smsService.sendSms(phone, message1);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void processAccountCreated(String message) {
        AccountCreatedEvent event = new Gson().fromJson(message, AccountCreatedEvent.class);
        emailService.sendEmail(event.getEmail(), "Account Created", "Account " + event.getAccountNumber());
        try {
            JSONObject obj = new JSONObject(message);
            String phone = obj.getString("phone");
            String username = obj.getString("username");

            String message1 = "Hi " + username + ", welcome to our platform!";
            smsService.sendSms(phone, message1);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void processTransaction(String message) {
        TransactionCompletedEvent event = new Gson().fromJson(message, TransactionCompletedEvent.class);
        emailService.sendEmail(event.getEmail(), "Transaction Done", "₹" + event.getAmount() + " completed.");
        try {
            JSONObject obj = new JSONObject(message);
            String phone = obj.getString("phone");
            String username = obj.getString("username");

            String message1 = "Hi " + username + ", welcome to our platform!";
            smsService.sendSms(phone, message1);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
//    public void processLoanApproval(String message) {
//        LoanApprovedEvent event = new Gson().fromJson(message, LoanApprovedEvent.class);
//        emailService.sendEmail(event.getEmail(), "Loan Approved", "Loan ID: " + event.getLoanId());
//        smsService.sendSms(event.getPhone(), "Loan " + event.getLoanId() + " approved.");
//    }
}
