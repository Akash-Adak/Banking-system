package com.banking.transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducer {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void publishTransactionEvent(Transaction tx) {
        String event = "Transaction ID " + tx.getId() + ": " + tx.getType() + " of ₹" + tx.getAmount();
        kafkaTemplate.send("transaction-events", event);
    }
}


