package com.elproyectegrande.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
public class ShoppingCart {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private ApplicationUser user;

    private Integer quantity;

    public ShoppingCart(Product product, ApplicationUser user, Integer quantity) {
        this.product = product;
        this.user = user;
        this.quantity = quantity;
    }

    public ShoppingCart() {

    }
}
