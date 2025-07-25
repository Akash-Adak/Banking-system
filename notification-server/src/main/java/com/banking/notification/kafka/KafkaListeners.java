package com.banking.notification.kafka;

import com.banking.notification.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaListeners {

    @Autowired
    private NotificationService handler;

    @KafkaListener(topics = "banking-users", groupId = "notification-group")
    public void userRegistered(String message) {
        handler.processUserRegistered(message);
    }

    @KafkaListener(topics = "banking-account", groupId = "notification-group")
    public void accountCreated(String message) {
        handler.processAccountCreated(message);
    }

    @KafkaListener(topics = "banking-transaction", groupId = "notification-group")
    public void transactionCompleted(String message) {
        handler.processTransaction(message);
    }

//    @KafkaListener(topics = "loan_approved", groupId = "notification-group")
//    public void loanApproved(String message) {
//        handler.processLoanApproval(message);
//    }
}
