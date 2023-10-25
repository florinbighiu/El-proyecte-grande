package com.elproyectegrande.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {

    @Autowired
    private JavaMailSender javaMailSender;
    public void sendMail(String body, String subject, String contactedEmail) throws MessagingException {

        MimeMessage mimeMailMessage = javaMailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMailMessage, true);

        mimeMessageHelper.setFrom("elproyectegrande@gmail.com");
        mimeMessageHelper.setTo("elproyectegrande@gmail.com");

        String emailContent = "Message: " + body + "\nEmail " + contactedEmail;

        mimeMessageHelper.setSubject("Sent from " + subject);
        mimeMessageHelper.setText(emailContent);

        javaMailSender.send(mimeMailMessage);

        System.out.println("Mail sent successfully");




    }
}
