package com.banking.notification.service;

import com.banking.notification.model.Notification;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    private final JavaMailSender mailSender;

    public NotificationService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendNotification(Notification notification) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(notification.getTo());
        mail.setSubject(notification.getSubject());
        mail.setText(notification.getText());
        mailSender.send(mail);
    }

    public void sendNotification(String to, String subject, String message) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(to);
        mail.setSubject(subject);
        mail.setText(message);
        mailSender.send(mail);
    }
}
