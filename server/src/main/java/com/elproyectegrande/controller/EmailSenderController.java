package com.elproyectegrande.controller;

import com.elproyectegrande.model.EmailData;
import com.elproyectegrande.service.EmailSenderService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/email")
public class EmailSenderController {

    @Autowired
    private EmailSenderService emailSenderService;



    @PostMapping("/send")
    public void triggerEmail(@RequestBody EmailData emailData) throws MessagingException {
        emailSenderService.sendMail(emailData.getName(), emailData.getEmail(), emailData.getMessage());
    }
}