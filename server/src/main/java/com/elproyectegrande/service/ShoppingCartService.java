package com.elproyectegrande.service;

import com.elproyectegrande.model.ApplicationUser;
import com.elproyectegrande.model.Product;
import com.elproyectegrande.model.ShoppingCart;
import com.elproyectegrande.repository.ProductRepository;
import com.elproyectegrande.repository.ShoppingCartRepository;
import com.elproyectegrande.repository.UserRepository;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class ShoppingCartService {

    
    private final ShoppingCartRepository shoppingCartRepository;

   
    private final ProductRepository productRepository;

    
    private final UserRepository userRepository;

    public void addToCart(Integer userId, Long productId, Integer quantity) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        Optional<ApplicationUser> optionalUser = userRepository.findById(userId);

        if (optionalProduct.isPresent() && optionalUser.isPresent() && quantity > 0) {
            Product product = optionalProduct.get();
            ApplicationUser user = optionalUser.get();

            if (product.getStock() >= quantity) {
                product.setStock(product.getStock() - quantity);
                productRepository.save(product);

                ShoppingCart existingCart = shoppingCartRepository.findByProductIdAndUserUserId(productId, userId);

                if (existingCart != null) {
                    existingCart.setQuantity(existingCart.getQuantity() + quantity);
                    shoppingCartRepository.save(existingCart);
                } else {
                    ShoppingCart cart = new ShoppingCart(product, user, quantity);
                    shoppingCartRepository.save(cart);
                }
            }
        }
    }


    public Iterable<ShoppingCart> getCartItems(Integer userId) {
        return shoppingCartRepository.findByUserUserId(userId);
    }


    public void increaseCartItemQuantity(Long cartItemId, Integer newQuantity) {
        if (newQuantity >= 0) {
            ShoppingCart cartItem = shoppingCartRepository.findById(cartItemId).orElse(null);
            assert cartItem != null;
            Product product = cartItem.getProduct();

            if (product.getStock() > 0) {

                product.setStock(product.getStock() - newQuantity);

                cartItem.setQuantity(cartItem.getQuantity() + newQuantity);
                shoppingCartRepository.save(cartItem);
            } else {
                throw new Error("The selected product does not have enough stock");
            }
        }
    }

    public void decreaseCartItemQuantity(Long cartItemId, Integer newQuantity) {
        if (newQuantity >= 0) {
            ShoppingCart cartItem = shoppingCartRepository.findById(cartItemId).orElse(null);

            assert cartItem != null;
            Product product = cartItem.getProduct();

            product.setStock(product.getStock() + newQuantity);

            cartItem.setQuantity(cartItem.getQuantity() - newQuantity);
            shoppingCartRepository.save(cartItem);

            if (cartItem.getQuantity() < 1) {
                shoppingCartRepository.delete(cartItem);
            }
        }
    }


    public void removeFromCart(Long cartItemId) {
        ShoppingCart cartItem = shoppingCartRepository.findById(cartItemId).orElse(null);

        if (cartItem != null) {
            Product product = cartItem.getProduct();
            Integer quantity = cartItem.getQuantity();

            product.setStock(product.getStock() + quantity);
            productRepository.save(product);

            shoppingCartRepository.deleteById(cartItemId);
        }
    }
}
