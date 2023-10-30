package com.elproyectegrande.repository;

import java.util.List;

import com.elproyectegrande.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByIsInCartTrue();

    List<Product> findProductByNameIgnoreCase(String name);

    List<Product> findByPriceBetween(Double minPrice, Double maxPrice);


}
