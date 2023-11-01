package com.elproyectegrande.service;

import com.elproyectegrande.model.Cart;
import com.elproyectegrande.model.Product;
import com.elproyectegrande.repository.CartRepository;
import com.elproyectegrande.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private  CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;



    public Cart addToCart(Long productId) {
    Product product = productRepository.findById(productId).get();
        if (product != null) {
            Cart cart = new Cart(product);
            return cartRepository.save(cart);
        }
        return null;
    }

        public void removeFromCart(Long cartItemId) {
        cartRepository.deleteById(cartItemId);
    }

    public Iterable<Cart> getCartItems() {
        return cartRepository.findAll();
    }
}
