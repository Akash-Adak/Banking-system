package com.banking.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendUserRegistered(String topic, String messageJson) {
        kafkaTemplate.send(topic, messageJson);
    }


    public void sendLoginSuccess(String topic, String json) {
        kafkaTemplate.send(topic,json);
    }
}
