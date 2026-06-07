package com.elproyectegrande.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PasswordResetConfirmDTO {
    @NotBlank(message = "Reset token is required")
    private String token;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String newPassword;

    public PasswordResetConfirmDTO() {
        super();
    }

    public PasswordResetConfirmDTO(String token, String newPassword) {
        super();
        this.token = token;
        this.newPassword = newPassword;
    }
}
