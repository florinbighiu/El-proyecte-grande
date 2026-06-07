package com.elproyectegrande.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RoleUpdateDTO {
    @NotBlank(message = "Role is required")
    private String role;

    public RoleUpdateDTO() {
        super();
    }

    public RoleUpdateDTO(String role) {
        super();
        this.role = role;
    }
}
