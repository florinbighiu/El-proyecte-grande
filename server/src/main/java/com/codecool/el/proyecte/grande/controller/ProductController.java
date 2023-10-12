package com.codecool.el.proyecte.grande.controller;

import com.codecool.el.proyecte.grande.exceptions.ProductNotFoundException;
import com.codecool.el.proyecte.grande.model.Product;
import com.codecool.el.proyecte.grande.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // Create a new product
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Product createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    // Read all products
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // Read a product by ID
    @GetMapping("/{productId}")
    public Product getProductById(@PathVariable Long productId) {
        return productService.getProductById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));
    }

    // Update an existing product
    @PutMapping("/{productId}")
    public Product updateProduct(@PathVariable Long productId, @RequestBody Product updatedProduct) {
        return productService.updateProduct(productId, updatedProduct);
    }

    // Delete a product by ID
    @DeleteMapping("/{productId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(@PathVariable Long productId) {
        productService.deleteProduct(productId);
    }
}
