package com.elproyectegrande.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailData {

    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Email must be a valid address")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Message is required")
    private String message;

}
