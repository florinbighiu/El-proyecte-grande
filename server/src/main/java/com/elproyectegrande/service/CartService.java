package com.elproyectegrande.service;

import com.elproyectegrande.model.Cart;
import com.elproyectegrande.model.Product;
import com.elproyectegrande.repository.CartRepository;
import com.elproyectegrande.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
                product.setStock(product.getStock() - quantity);
                productRepository.save(product);

                Cart existingCart = cartRepository.findByProductId(productId);

                if (existingCart != null) {
                    existingCart.setQuantity(existingCart.getQuantity() + quantity);
                    return cartRepository.save(existingCart);
                } else {
                    Cart cart = new Cart(product, quantity);
                    return cartRepository.save(cart);
                }
            } else {
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
