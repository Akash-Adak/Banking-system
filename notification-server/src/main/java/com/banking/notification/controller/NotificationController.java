package com.banking.notification.controller;

import com.banking.notification.model.Notification;
import com.banking.notification.service.Fast2SmsService;
import com.banking.notification.service.NotificationService;
import com.netflix.discovery.converters.Auto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService service;

    public NotificationController(NotificationService service) {
        this.service = service;
    }


    @PostMapping("/send")
    public String send(@RequestBody Notification notification) {
        service.sendNotification(notification);
        return "Notification sent";
    }

   @Autowired
    private  Fast2SmsService smsService;

    @PostMapping("/sms")
    public ResponseEntity<String> sendSms(@RequestParam String phone, @RequestParam String message) {
        String result = smsService.sendSms(phone, message);
        return ResponseEntity.ok(result);
    }

}
