package com.elproyectegrande.controller;

import com.elproyectegrande.model.ApplicationUser;
import com.elproyectegrande.model.LoginResponseDTO;
import com.elproyectegrande.model.RegistrationDTO;
import com.elproyectegrande.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<ApplicationUser> registerUser(@RequestBody RegistrationDTO body) {
        if (body.getUsername() == null || body.getUsername().isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        if (body.getPassword() == null || body.getPassword().length() < 6) {
            return ResponseEntity.badRequest().build();
        }
        ApplicationUser user = authenticationService.registerUser(
                body.getUsername(), body.getPassword(), body.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> loginUser(@RequestBody RegistrationDTO body) {
        LoginResponseDTO response = authenticationService.loginUser(
                body.getUsername(), body.getPassword());
        return ResponseEntity.ok(response);
    }
}
