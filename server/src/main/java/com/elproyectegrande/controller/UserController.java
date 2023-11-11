package com.elproyectegrande.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.*;

import com.elproyectegrande.model.ApplicationUser;
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
    public Optional<ApplicationUser> getUserById(@PathVariable Integer userId) {
        return userService.getUserById(userId);
    }
}
