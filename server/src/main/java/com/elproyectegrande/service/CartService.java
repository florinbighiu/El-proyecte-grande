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



    public Cart addToCart(Long productId, Integer quantity) {
        Product product = productRepository.findById(productId).get();

        if (product != null && quantity > 0) {
            if (product.getStock() >= quantity) {
                // Update the product's stock in the database
                product.setStock(product.getStock() - quantity);
                productRepository.save(product);

                // Check if the product is already in the cart
                Cart existingCart = cartRepository.findByProductId(productId);

                if (existingCart != null) {
                    // Product is already in the cart, increase the quantity
                    existingCart.setQuantity(existingCart.getQuantity() + quantity);
                    return cartRepository.save(existingCart);
                } else {
                    // Product is not in the cart, create a new cart item
                    Cart cart = new Cart(product, quantity);
                    return cartRepository.save(cart);
                }
            } else {
                // Not enough stock to add to the cart
                return null;
            }
        }
        return null;
    }

    public void removeFromCart(Long cartItemId) {
        Cart cartItem = cartRepository.findById(cartItemId).orElse(null);

        if (cartItem != null) {
            Product product = cartItem.getProduct();
            Integer quantity = cartItem.getQuantity();

            product.setStock(product.getStock() + quantity);
            productRepository.save(product);

            cartRepository.deleteById(cartItemId);
        }
    }

    public Iterable<Cart> getCartItems() {
        return cartRepository.findAll();
    }
}
