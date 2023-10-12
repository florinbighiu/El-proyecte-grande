package com.elproyectegrande.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.elproyectegrande.model.Product;
import com.elproyectegrande.service.ProductService;

@RestController
@RequestMapping("/cart/products")
public class CartController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getCartProducts() {
        return productService.getCartProducts();
    }

     @PutMapping("/add/{productId}")
    public ResponseEntity<String> addToCart(@PathVariable Long productId) {
        Product product = productService.addProductToCart(productId);
        if (product != null) {
            return ResponseEntity.ok("Product added to cart");
        } else {
            return ResponseEntity.badRequest().body("Failed to add product to cart");
        }
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<String> removeFromCart(@PathVariable Long productId) {
        boolean removed = productService.removeProductFromCart(productId);
        if (removed) {
            return ResponseEntity.ok("Product removed from the cart");
        } else {
            return ResponseEntity.badRequest().body("Failed to remove product from the cart");
        }
    }
}

