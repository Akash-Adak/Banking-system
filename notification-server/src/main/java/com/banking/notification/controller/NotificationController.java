package com.banking.notification.controller;

import com.banking.notification.service.NotificationService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService service;

    public NotificationController(NotificationService service) {
        this.service = service;
    }

    @PostMapping("/send")
    public String send(@RequestParam String to,
                       @RequestParam String subject,
                       @RequestParam String message) {
        service.sendNotification(to, subject, message);
        return "Notification sent";
    }
}
