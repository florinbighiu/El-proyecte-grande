package com.elproyectegrande.controller;

import com.elproyectegrande.model.EmailData;
import com.elproyectegrande.model.OrderEmailDTO;
import com.elproyectegrande.service.EmailSenderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/email")
public class EmailSenderController {

    @Autowired
    private EmailSenderService emailSenderService;

    @PostMapping("/send")
    public ResponseEntity<Map<String, String>> triggerEmail(@Valid @RequestBody EmailData emailData) {
        emailSenderService.sendContactMessage(emailData.getName(), emailData.getEmail(), emailData.getMessage());
        return ResponseEntity.ok(Map.of("message", "Your message has been sent successfully."));
    }

    @PostMapping("/order")
    public ResponseEntity<Map<String, String>> triggerOrderEmail(@Valid @RequestBody OrderEmailDTO orderData) {
        emailSenderService.sendOrderEmail(orderData);
        return ResponseEntity.ok(Map.of("message", "Your order has been placed successfully."));
    }
}
