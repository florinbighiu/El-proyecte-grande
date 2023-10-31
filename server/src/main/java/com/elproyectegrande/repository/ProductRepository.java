package com.elproyectegrande.repository;

import java.util.List;

import com.elproyectegrande.model.Product;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByIsInCartTrue();

    List<Product> findProductByNameContainingIgnoreCaseAndPriceBetween(String name, Double minPrice, Double maxPrice, Sort sort);

//    List<Product> findByPriceBetween(Double minPrice, Double maxPrice);


}
