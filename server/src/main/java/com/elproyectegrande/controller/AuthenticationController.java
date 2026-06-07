package com.elproyectegrande.controller;

import com.elproyectegrande.model.ApplicationUser;
import com.elproyectegrande.model.LoginResponseDTO;
import com.elproyectegrande.model.PasswordResetConfirmDTO;
import com.elproyectegrande.model.PasswordResetRequestDTO;
import com.elproyectegrande.model.RegistrationDTO;
import com.elproyectegrande.service.AuthenticationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<ApplicationUser> registerUser(@Valid @RequestBody RegistrationDTO body) {
        ApplicationUser user = authenticationService.registerUser(
                body.getUsername(), body.getPassword(), body.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> loginUser(@Valid @RequestBody RegistrationDTO body) {
        LoginResponseDTO response = authenticationService.loginUser(
                body.getUsername(), body.getPassword());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/reset/request")
    public ResponseEntity<Map<String, String>> requestPasswordReset(@Valid @RequestBody PasswordResetRequestDTO body) {
        authenticationService.requestPasswordReset(body.getEmail());
        return ResponseEntity.ok(Map.of("message", "If that email is registered, we've sent a reset link to it."));
    }

    @PostMapping("/reset/confirm")
    public ResponseEntity<Map<String, String>> confirmPasswordReset(@Valid @RequestBody PasswordResetConfirmDTO body) {
        authenticationService.confirmPasswordReset(body.getToken(), body.getNewPassword());
        return ResponseEntity.ok(Map.of("message", "Password updated. You can now log in."));
    }
}
