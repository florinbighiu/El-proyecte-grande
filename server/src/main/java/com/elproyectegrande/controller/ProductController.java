package com.elproyectegrande.controller;

import com.elproyectegrande.exceptions.ProductNotFoundException;
import com.elproyectegrande.model.Product;
import com.elproyectegrande.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/products")
//@CrossOrigin(origins = "*", methods = {RequestMethod.PUT, RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST})
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{productId}")
    public Product getProductById(@PathVariable Long productId) {
        return productService.getProductById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));
    }

    @PutMapping("/{productId}")
    public Product updateProduct(@PathVariable Long productId, @RequestBody Product updatedProduct) {
        return productService.updateProduct(productId, updatedProduct);
    }

    @PostMapping("/create")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product createdProduct = productService.createProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @DeleteMapping("/{productId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(@PathVariable Long productId) {
        productService.deleteProduct(productId);
    }

    @GetMapping("/search")
    public List<Product> searchByProductName(@RequestParam String query, @RequestParam Double minPrice, @RequestParam Double maxPrice) {
        return productService.searchProductsByName(query, minPrice, maxPrice);
    }

//    @GetMapping("/price")
//    public List<Product> getProductsInPriceRange(@RequestParam Double minPrice, @RequestParam Double maxPrice) {
//        return productService.getProductsInPriceRange(minPrice, maxPrice);
//    }
}
