package com.banking.notification.kafka;

import com.banking.notification.service.NotificationService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class NotificationConsumer {

    private final NotificationService notificationService;

    public NotificationConsumer(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @KafkaListener(topics = "transaction-events", groupId = "notification-group")
    public void consumeTransactionEvent(String message) {
        System.out.println("📩 Received transaction event: " + message);
        notificationService.sendNotification("user@example.com", "Transaction Alert", message);
    }
}
