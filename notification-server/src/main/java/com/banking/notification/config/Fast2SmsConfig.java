package com.banking.notification.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "fast2sms")
@Data
public class Fast2SmsConfig {
    private String apiKey;
    private String senderId;
    private String route;
}
