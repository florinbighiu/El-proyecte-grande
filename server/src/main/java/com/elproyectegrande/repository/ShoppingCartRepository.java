package com.elproyectegrande.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.elproyectegrande.model.ShoppingCart;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {
    ShoppingCart findByProductId(Long productId);

    Iterable<ShoppingCart> findByUserUserId(Integer userId);

    ShoppingCart findByProductIdAndUserUserId(Long productId, Integer userId);
}
