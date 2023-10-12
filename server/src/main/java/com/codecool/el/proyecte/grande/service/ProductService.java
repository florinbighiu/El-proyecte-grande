package com.codecool.el.proyecte.grande.service;

import com.codecool.el.proyecte.grande.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Create a new product
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    // Read all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Read a product by ID
    public Optional<Product> getProductById(Long productId) {
        return productRepository.findById(productId);
    }

    // Update an existing product
    public Product updateProduct(Long productId, Product updatedProduct) {
        Optional<Product> existingProductOptional = productRepository.findById(productId);
        if (existingProductOptional.isPresent()) {
            Product existingProduct = existingProductOptional.get();
            existingProduct.setName(updatedProduct.getName());
            existingProduct.setDescription(updatedProduct.getDescription());
            existingProduct.setPrice(updatedProduct.getPrice());
            return productRepository.save(existingProduct);
        }
        return null; // Handle not found case
    }

    // Delete a product by ID
    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }
}
