package com.banking.user.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class kafkaTopic {

    @Bean
    public NewTopic UserTopic(){
        return TopicBuilder.name("user").build();
    }
}
