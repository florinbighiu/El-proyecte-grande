package com.elproyectegrande.service;

import com.elproyectegrande.model.*;
import com.elproyectegrande.repository.ProductRepository;
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

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long productId) {
        return productRepository.findById(productId);
    }

    public Product updateProduct(Long productId, Product updatedProduct) {
        Optional<Product> existingProductOptional = productRepository.findById(productId);
        if (existingProductOptional.isPresent()) {
            Product existingProduct = existingProductOptional.get();
            existingProduct.setTitle(updatedProduct.getTitle());
            existingProduct.setDescription(updatedProduct.getDescription());
            existingProduct.setDiscountPercentage(updatedProduct.getDiscountPercentage());
            existingProduct.setBrand(updatedProduct.getBrand());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setRating(updatedProduct.getRating());
            existingProduct.setStock(updatedProduct.getStock());
            existingProduct.setThumbnail(updatedProduct.getThumbnail());
            existingProduct.setCategory(updatedProduct.getCategory());

            return productRepository.save(existingProduct);
        }
        return null;
    }

    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }

//     public Product addProductToCart(Long productId) {
//     Optional<Product> optionalProduct = productRepository.findById(productId);
//
//     if (optionalProduct.isPresent()) {
//     Product product = optionalProduct.get();
//     product.setIsInCart(true);
//     return productRepository.save(product);
//     }
//
//     return null;
//     }
//
//    public List<Product> getCartProducts() {
//        return productRepository.findByIsInCartTrue();
//    }

//     public boolean removeProductFromCart(Long productId) {
//     Optional<Product> optionalProduct = productRepository.findById(productId);
//
//     if (optionalProduct.isPresent()) {
//     Product product = optionalProduct.get();
//     product.setIsInCart(false);
//     productRepository.save(product);
//     return true;
//     }
//
//     return false;
//     }

    public List<Product> searchProductsByName(String query, Double minPrice, Double maxPrice) {
        return productRepository.findProductByTitleIgnoreCaseAndPriceBetween(query, minPrice, maxPrice);
    }

    // public List<Product> getProductsInPriceRange(Double minPrice, Double
    // maxPrice) {
    // return productRepository.findByPriceBetween(minPrice, maxPrice);
    // }
}
