package com.elproyectegrande.repository;

import java.util.List;

import com.elproyectegrande.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findProductByTitleIgnoreCaseAndPriceBetween(String title, Double minPrice, Double maxPrice);

}
