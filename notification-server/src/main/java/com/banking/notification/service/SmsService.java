package com.banking.notification.service;

import com.banking.notification.config.TwilioConfig;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SmsService {

    @Autowired
    private TwilioConfig config;

    @PostConstruct
    public void init() {
        Twilio.init(config.getAccountSid(), config.getAuthToken());
    }

    public void sendSms(String to, String message) {
        Message.creator(
                new com.twilio.type.PhoneNumber(to),
                new com.twilio.type.PhoneNumber(config.getFromNumber()),
                message
        ).create();
        System.out.println("✅ SMS sent to " + to + ": " + message);
    }
}
