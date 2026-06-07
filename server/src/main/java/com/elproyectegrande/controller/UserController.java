package com.elproyectegrande.controller;

import java.util.List;
import java.util.Map;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.elproyectegrande.model.ApplicationUser;
import com.elproyectegrande.model.EmailUpdateDTO;
import com.elproyectegrande.model.PasswordChangeDTO;
import com.elproyectegrande.service.UserService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public List<ApplicationUser> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApplicationUser> getUserById(@PathVariable Integer userId) {
        return userService.getUserById(userId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/me")
    public ApplicationUser updateOwnEmail(Authentication authentication, @Valid @RequestBody EmailUpdateDTO body) {
        return userService.updateEmail(authentication.getName(), body.getEmail());
    }

    @PutMapping("/me/password")
    public ResponseEntity<Map<String, String>> changeOwnPassword(Authentication authentication, @Valid @RequestBody PasswordChangeDTO body) {
        userService.changePassword(authentication.getName(), body.getCurrentPassword(), body.getNewPassword());
        return ResponseEntity.ok(Map.of("message", "Password updated successfully."));
    }
}
