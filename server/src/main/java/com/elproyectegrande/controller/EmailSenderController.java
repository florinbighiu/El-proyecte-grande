package com.elproyectegrande.controller;

import com.elproyectegrande.service.EmailSenderService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ApplicationContextEvent;
import org.springframework.context.event.EventListener;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/send_email")
public class EmailSenderController {

    @Autowired
    public EmailSenderService emailSenderService;

    @PostMapping("/")
    public void triggerEmail() throws MessagingException {
        emailSenderService.sendMail("This is body", "This is subject");
    }

}
