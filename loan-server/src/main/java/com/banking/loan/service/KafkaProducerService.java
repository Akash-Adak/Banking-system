package com.banking.loan.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendLoanMsg(String topic, String messageJson) {
        kafkaTemplate.send(topic, messageJson);
    }

}
