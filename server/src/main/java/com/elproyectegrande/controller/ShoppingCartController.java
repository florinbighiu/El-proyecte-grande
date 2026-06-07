package com.elproyectegrande.controller;

import com.elproyectegrande.model.CheckoutDTO;
import com.elproyectegrande.model.ShoppingCart;
import com.elproyectegrande.service.ShoppingCartService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "*")
public class ShoppingCartController {

    @Autowired
    private ShoppingCartService shoppingCartService;

    @GetMapping("/items/{userId}")
    public Iterable<ShoppingCart> getCartItems(@PathVariable Integer userId) {
        return shoppingCartService.getCartItems(userId);
    }

    @PostMapping("/add/{userId}/{productId}/{quantity}")
    public void addToCart(@PathVariable Integer userId, @PathVariable Long productId, @PathVariable Integer quantity) {
        shoppingCartService.addToCart(userId, productId, quantity);
    }

    @DeleteMapping("/remove/{cartItemId}")
    public void removeFromCart(@PathVariable Long cartItemId) {
        shoppingCartService.removeFromCart(cartItemId);
    }

    @PutMapping("/update/increase/{cartItemId}/{newQuantity}")
    public ResponseEntity<String> increaseItemQuantity(
            @PathVariable Long cartItemId,
            @PathVariable Integer newQuantity) {
        try {
            shoppingCartService.increaseCartItemQuantity(cartItemId, newQuantity);
            return ResponseEntity.ok("Cart item updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update cart item: " + e.getMessage());
        }
    }

    @PutMapping("/update/decrease/{cartItemId}/{newQuantity}")
    public ResponseEntity<String> decreaseItemQuantity(
            @PathVariable Long cartItemId,
            @PathVariable Integer newQuantity) {
        try {
            shoppingCartService.decreaseCartItemQuantity(cartItemId, newQuantity);
            return ResponseEntity.ok("Cart item updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update cart item: " + e.getMessage());
        }
    }

    @PostMapping("/checkout/{userId}")
    public ResponseEntity<Map<String, String>> checkout(@PathVariable Integer userId, @Valid @RequestBody CheckoutDTO checkoutInfo) {
        shoppingCartService.checkout(userId, checkoutInfo);
        return ResponseEntity.ok(Map.of("message", "Order placed successfully."));
    }

}
