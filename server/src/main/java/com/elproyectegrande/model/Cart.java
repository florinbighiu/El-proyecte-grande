package com.elproyectegrande.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Product product;

    @OneToOne
    private ApplicationUser user;

    private Integer quantity;

    public Cart(Product product, Integer quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    public Cart() {

    }
}
