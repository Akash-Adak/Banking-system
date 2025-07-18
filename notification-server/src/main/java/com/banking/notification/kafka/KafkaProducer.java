package com.banking.notification.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;

    public KafkaProducer(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendUserCreatedEvent(String username) {
        String message = username + " created";
        kafkaTemplate.send("user-events", message);
        System.out.println("✅ Sent Kafka event: " + message);
    }
    public void sendUserUpdateEvent(String username) {
        String message = username + " Updated";
        kafkaTemplate.send("user-events", message);
        System.out.println("✅ Sent Kafka event: " + message);
    }
}
