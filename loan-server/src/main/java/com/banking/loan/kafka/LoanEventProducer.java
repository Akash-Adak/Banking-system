package com.banking.loan.kafka;

import com.banking.loan.model.Loan;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class LoanEventProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public LoanEventProducer(KafkaTemplate<String, Object> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendLoanEvent(String topic, Loan loan) {
        kafkaTemplate.send(topic, loan);
    }
}
