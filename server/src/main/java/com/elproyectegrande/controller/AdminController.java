package com.elproyectegrande.controller;

import com.elproyectegrande.model.ApplicationUser;
import com.elproyectegrande.model.RoleUpdateDTO;
import com.elproyectegrande.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public String helloAdminController() {
        return "Admin level access";
    }

    @PutMapping("/users/{userId}/role")
    public ApplicationUser updateUserRole(@PathVariable Integer userId, @Valid @RequestBody RoleUpdateDTO roleUpdate) {
        return userService.updateUserRole(userId, roleUpdate.getRole());
    }

    @DeleteMapping("/users/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Integer userId) {
        userService.deleteUser(userId);
    }
}
