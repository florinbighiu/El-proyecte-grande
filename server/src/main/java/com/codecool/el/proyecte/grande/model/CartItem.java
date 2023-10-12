package com.codecool.el.proyecte.grande.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import org.springframework.data.annotation.Id;

@Entity
public class CartItem {

    @jakarta.persistence.Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int quantity;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
    // Other fields, getters, and setters
}