package com.codecool.el.proyecte.grande.service;

import com.codecool.el.proyecte.grande.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {}
