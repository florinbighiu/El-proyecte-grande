package com.elproyectegrande.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RegistrationDTO {
    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

    @Email(message = "Email must be a valid address")
    private String email;

    public RegistrationDTO() {
        super();
    }

    public RegistrationDTO(String username, String password, String email) {
        super();
        this.username = username;
        this.password = password;
        this.email = email;
    }

}
