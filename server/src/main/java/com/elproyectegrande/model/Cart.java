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
    private Role role;

    public Cart(Product product) {
        this.product = product;
    }

    public Cart() {

    }
}
