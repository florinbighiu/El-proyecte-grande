package com.codecool.el.proyecte.grande.service;

import com.codecool.el.proyecte.grande.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}