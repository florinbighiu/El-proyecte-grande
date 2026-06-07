package com.elproyectegrande.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class EmailUpdateDTO {
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be a valid address")
    private String email;

    public EmailUpdateDTO() {
        super();
    }

    public EmailUpdateDTO(String email) {
        super();
        this.email = email;
    }
}
