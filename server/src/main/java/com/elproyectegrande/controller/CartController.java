package com.elproyectegrande.controller;

import com.elproyectegrande.model.Cart;
import com.elproyectegrande.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add/{productId}/{quantity}")
    public Cart addToCart(
            @PathVariable Long productId,
            @PathVariable Integer quantity) {
        return cartService.addToCart(productId, quantity);
    }

    @DeleteMapping("/remove/{cartItemId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long cartItemId) {
        cartService.removeFromCart(cartItemId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/items")
    public Iterable<Cart> getCartItems() {
        return cartService.getCartItems();
    }
}
