package com.elproyectegrande.service;

import com.elproyectegrande.model.*;
import com.elproyectegrande.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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

    public List<Product> getCartProducts() {
        return productRepository.findByIsInCartTrue();
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
            existingProduct.setName(updatedProduct.getName());
            existingProduct.setDescription(updatedProduct.getDescription());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setImage(updatedProduct.getImage());
            return productRepository.save(existingProduct);
        }
        return null;
    }


    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }

    public Product addProductToCart(Long productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setIsInCart(true);
            return productRepository.save(product);
        }

        return null;
    }

    public boolean removeProductFromCart(Long productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setIsInCart(false);
            productRepository.save(product);
            return true;
        }

        return false;
    }

    public List<Product> searchProductsByName(String query, Double minPrice, Double maxPrice, Boolean sortByPriceAsc, Boolean sortAlphabeticallyAsc) {
        Sort sort = Sort.unsorted();
        if (sortByPriceAsc != null) {
            sort = sortByPriceAsc ? Sort.by("price").ascending() : Sort.by("price").descending();
        }
        if (sortAlphabeticallyAsc != null) {
            sort = sortAlphabeticallyAsc ? sort.and(Sort.by("name").ascending()) : sort.and(Sort.by("name").descending());


        }
        return productRepository.findProductByNameContainingIgnoreCaseAndPriceBetween(query, minPrice, maxPrice, sort);


    }
}
