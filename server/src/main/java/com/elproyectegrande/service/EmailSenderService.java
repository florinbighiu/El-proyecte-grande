package com.elproyectegrande.service;

import com.elproyectegrande.model.CheckoutDTO;
import com.elproyectegrande.model.Product;
import com.elproyectegrande.model.ShoppingCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class EmailSenderService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${app.mail.from}")
    private String mailFrom;

    private static final DateTimeFormatter SENT_AT = DateTimeFormatter.ofPattern("MMM d, yyyy 'at' HH:mm");

    public void sendContactMessage(String name, String email, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(mailFrom);
        mailMessage.setTo(mailFrom);
        mailMessage.setReplyTo(email);
        mailMessage.setSubject("New contact message from " + name);
        mailMessage.setText(
                "You have received a new message through the website contact form.\n\n"
                        + "From:    " + name + "\n"
                        + "Email:   " + email + "\n"
                        + "Sent:    " + ZonedDateTime.now().format(SENT_AT) + "\n\n"
                        + "Message:\n"
                        + message + "\n\n"
                        + "----------------------------------------\n"
                        + "Reply directly to this email to respond to " + name + ".");

        javaMailSender.send(mailMessage);
    }

    public void sendOrderNotification(CheckoutDTO customerInfo, List<ShoppingCart> items, double subtotal, double deliveryFee) {
        StringBuilder body = new StringBuilder();
        body.append("A new order has been placed.\n\n");
        body.append("Customer details:\n");
        body.append("  Name: ").append(customerInfo.getName()).append("\n");
        body.append("  Email: ").append(customerInfo.getEmail()).append("\n");
        body.append("  Phone: ").append(customerInfo.getPhone()).append("\n");
        body.append("  Delivery address: ").append(customerInfo.getAddress()).append("\n\n");
        body.append("Order items:\n");
        for (ShoppingCart item : items) {
            Product product = item.getProduct();
            double unitPrice = product.getDiscountPercentage() > 0
                    ? product.getPrice() - (product.getPrice() * product.getDiscountPercentage()) / 100
                    : product.getPrice();
            body.append(String.format("  - %s  x%d  —  $%.2f%n", product.getTitle(), item.getQuantity(), unitPrice * item.getQuantity()));
        }
        body.append(String.format("%nSubtotal: $%.2f%n", subtotal));
        body.append(String.format("Delivery: $%.2f%n", deliveryFee));
        body.append(String.format("Total: $%.2f%n", subtotal + deliveryFee));

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(mailFrom);
        mailMessage.setTo(mailFrom);
        mailMessage.setReplyTo(customerInfo.getEmail());
        mailMessage.setSubject(String.format("New order from %s — $%.2f", customerInfo.getName(), subtotal + deliveryFee));
        mailMessage.setText(body.toString());

        javaMailSender.send(mailMessage);
    }
}
