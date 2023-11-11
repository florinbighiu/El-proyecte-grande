package com.elproyectegrande.service;

import com.elproyectegrande.model.ApplicationUser;
import com.elproyectegrande.model.Product;
import com.elproyectegrande.model.ShoppingCart;
import com.elproyectegrande.repository.ProductRepository;
import com.elproyectegrande.repository.ShoppingCartRepository;
import com.elproyectegrande.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ShoppingCartService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

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


    public void removeFromCart(Long cartItemId, Integer quantity) {
        ShoppingCart cartItem = shoppingCartRepository.findById(cartItemId).get();

        Product product = cartItem.getProduct();
        Integer productQuantity = cartItem.getQuantity();

        if (quantity > 0 && productQuantity > 0) {
            int newCartItemQuantity = productQuantity - quantity;

            if (newCartItemQuantity < 0) {
                newCartItemQuantity = 0;
            }

            cartItem.setQuantity(newCartItemQuantity);
            shoppingCartRepository.save(cartItem);

            product.setStock(product.getStock() + quantity);
            productRepository.save(product);

            if (cartItem.getQuantity() == 0) {
                shoppingCartRepository.deleteById(cartItemId);
            }
        }

    }
}
