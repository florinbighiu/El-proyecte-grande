package com.elproyectegrande.service;

import com.elproyectegrande.model.OrderEmailDTO;
import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class EmailSenderService {

    private static final DateTimeFormatter SENT_AT = DateTimeFormatter.ofPattern("MMM d, yyyy 'at' HH:mm");

    private final Resend resend;
    private final String fromAddress;
    private final String ownerInbox;

    public EmailSenderService(
            @Value("${app.mail.resend-api-key}") String resendApiKey,
            @Value("${app.mail.from}") String fromAddress,
            @Value("${app.mail.owner-inbox}") String ownerInbox) {
        this.resend = new Resend(resendApiKey);
        this.fromAddress = fromAddress;
        this.ownerInbox = ownerInbox;
    }

    public void sendContactMessage(String name, String email, String message) {
        String body = "You have received a new message through the website contact form.\n\n"
                + "From:    " + name + "\n"
                + "Email:   " + email + "\n"
                + "Sent:    " + ZonedDateTime.now().format(SENT_AT) + "\n\n"
                + "Message:\n"
                + message + "\n\n"
                + "----------------------------------------\n"
                + "Reply directly to this email to respond to " + name + ".";

        CreateEmailOptions options = CreateEmailOptions.builder()
                .from(fromAddress)
                .to(ownerInbox)
                .replyTo(email)
                .subject("New contact message from " + name)
                .text(body)
                .build();

        dispatch(options);
    }

    public void sendOrderEmail(OrderEmailDTO order) {
        StringBuilder body = new StringBuilder();
        body.append("A new order has been placed.\n\n");
        body.append("Customer details:\n");
        body.append("  Name: ").append(order.getName()).append("\n");
        body.append("  Email: ").append(order.getEmail()).append("\n");
        body.append("  Phone: ").append(order.getPhone()).append("\n");
        body.append("  Delivery address: ").append(order.getAddress()).append("\n\n");
        body.append("Order items:\n");

        double subtotal = 0;
        for (OrderEmailDTO.OrderLine line : order.getItems()) {
            double unitPrice = line.getDiscountPercentage() > 0
                    ? line.getPrice() - (line.getPrice() * line.getDiscountPercentage()) / 100
                    : line.getPrice();
            double lineTotal = unitPrice * line.getQuantity();
            subtotal += lineTotal;
            body.append(String.format("  - %s  x%d  —  $%.2f%n", line.getTitle(), line.getQuantity(), lineTotal));
        }

        double deliveryFee = order.getDeliveryFee();
        body.append(String.format("%nSubtotal: $%.2f%n", subtotal));
        body.append(String.format("Delivery: $%.2f%n", deliveryFee));
        body.append(String.format("Total: $%.2f%n", subtotal + deliveryFee));

        CreateEmailOptions options = CreateEmailOptions.builder()
                .from(fromAddress)
                .to(ownerInbox)
                .replyTo(order.getEmail())
                .subject(String.format("New order from %s — $%.2f", order.getName(), subtotal + deliveryFee))
                .text(body.toString())
                .build();

        dispatch(options);
    }

    private void dispatch(CreateEmailOptions options) {
        try {
            resend.emails().send(options);
        } catch (ResendException e) {
            throw new RuntimeException("Failed to send email: " + e.getMessage(), e);
        }
    }
}
