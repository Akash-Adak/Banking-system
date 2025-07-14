package com.banking.notification.service;

import com.banking.notification.config.Fast2SmsConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@RequiredArgsConstructor
public class Fast2SmsService {

    private final Fast2SmsConfig config;
    private final RestTemplate restTemplate = new RestTemplate();

    public String sendSms(String phoneNumber, String messageText) {
        try {
            String url = UriComponentsBuilder.fromHttpUrl("https://www.fast2sms.com/dev/bulkV2")
                    .queryParam("authorization", config.getApiKey())
                    .queryParam("sender_id", config.getSenderId())
                    .queryParam("message", messageText)
                    .queryParam("language", "english")
                    .queryParam("route", config.getRoute())
                    .queryParam("numbers", phoneNumber)
                    .toUriString();

            HttpHeaders headers = new HttpHeaders();
            headers.set("cache-control", "no-cache");

            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            return response.getBody();

        } catch (Exception e) {
            e.printStackTrace();
            return "❌ SMS send failed: " + e.getMessage();
        }
    }
}
