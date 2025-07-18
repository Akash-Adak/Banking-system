package com.banking.authentication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendMessage(String topic, String messageJson) {
        kafkaTemplate.send(topic, messageJson);
        System.out.println("📩message sent: " + messageJson);
    }
}
