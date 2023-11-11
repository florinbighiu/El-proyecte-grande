package com.elproyectegrande.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RegistrationDTO {
    private String username;
    private String password;

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
