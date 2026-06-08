package com.elproyectegrande.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class OrderEmailDTO {

    @NotBlank(message = "Full name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email")
    private String email;

    @NotBlank(message = "Phone number is required")
    private String phone;

    @NotBlank(message = "Address is required")
    private String address;

    @NotEmpty(message = "Order must contain at least one item")
    private List<OrderLine> items;

    private double deliveryFee;

    @Getter
    @Setter
    @ToString
    public static class OrderLine {
        private String title;
        private int quantity;
        private double price;
        private double discountPercentage;
    }
}
