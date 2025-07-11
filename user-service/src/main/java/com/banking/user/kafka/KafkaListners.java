package com.banking.user.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaListners {
    @KafkaListener(topics = "user", groupId = "userId")
    void listners(String data){
        System.out.println("Listener received "+ data +"🎉🎉");
    }
}
