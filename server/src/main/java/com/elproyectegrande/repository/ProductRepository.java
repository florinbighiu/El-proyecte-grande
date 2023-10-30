package com.elproyectegrande.repository;

import java.util.List;

import com.elproyectegrande.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByIsInCartTrue();

    List<Product> findProductByNameIgnoreCaseAndPriceBetween(String name, Double minPrice, Double maxPrice);

//    List<Product> findByPriceBetween(Double minPrice, Double maxPrice);


}
