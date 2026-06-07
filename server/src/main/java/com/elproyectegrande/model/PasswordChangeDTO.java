package com.elproyectegrande.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PasswordChangeDTO {
    @NotBlank(message = "Current password is required")
    private String currentPassword;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String newPassword;

    public PasswordChangeDTO() {
        super();
    }

    public PasswordChangeDTO(String currentPassword, String newPassword) {
        super();
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }
}
