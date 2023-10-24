package com.elproyectegrande.controller;


import com.elproyectegrande.model.ApplicationUser;
import com.elproyectegrande.model.LoginResponseDTO;
import com.elproyectegrande.model.RegistrationDTO;
import com.elproyectegrande.service.AuthenticationService;
import jakarta.persistence.Column;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public ApplicationUser registerUser(@RequestBody RegistrationDTO body) {
        return authenticationService.registerUser(body.getUsername(), body.getPassword());
    }

    @PostMapping("/login")
    public LoginResponseDTO loginUser(@RequestBody RegistrationDTO body) {
        return authenticationService.loginUser(body.getUsername(), body.getPassword());
    }
}
