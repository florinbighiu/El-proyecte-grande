package com.elproyectegrande.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CheckoutDTO {
    @NotBlank(message = "Full name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email")
    private String email;

    @NotBlank(message = "Phone number is required")
    private String phone;

    @NotBlank(message = "Address is required")
    private String address;

    public CheckoutDTO() {
        super();
    }

    public CheckoutDTO(String name, String email, String phone, String address) {
        super();
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }
}
