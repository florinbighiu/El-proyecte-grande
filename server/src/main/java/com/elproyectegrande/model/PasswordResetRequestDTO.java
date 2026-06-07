package com.elproyectegrande.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PasswordResetRequestDTO {
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be a valid address")
    private String email;

    public PasswordResetRequestDTO() {
        super();
    }

    public PasswordResetRequestDTO(String email) {
        super();
        this.email = email;
    }
}
