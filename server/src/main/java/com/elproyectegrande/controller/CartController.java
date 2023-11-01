package com.elproyectegrande.controller;

import com.elproyectegrande.model.Cart;
import com.elproyectegrande.model.Product;
import com.elproyectegrande.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add/{productId}")
    public Cart addToCart(@PathVariable(name = "productId") Long productId) {
        return cartService.addToCart(productId);
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
