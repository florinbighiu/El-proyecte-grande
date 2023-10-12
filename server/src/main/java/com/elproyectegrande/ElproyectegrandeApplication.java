package com.elproyectegrande;

import com.elproyectegrande.model.Product;
import com.elproyectegrande.model.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ElproyectegrandeApplication {

	public static void main(String[] args) {
		SpringApplication.run(ElproyectegrandeApplication.class, args);
	}

	@Bean
	public CommandLineRunner initData(ProductRepository productRepository) {
		return args -> {
			// Create and insert products here
			Product product1 = new Product();
			product1.setName("Product 1");
			product1.setDescription("Description for Product 1");
			product1.setPrice(19.99);
			productRepository.save(product1);

			Product product2 = new Product();
			product2.setName("Product 2");
			product2.setDescription("Description for Product 2");
			product2.setPrice(29.99);
			productRepository.save(product2);

			Product product3 = new Product();
			product3.setName("Product 3");
			product3.setDescription("Description for Product 3");
			product3.setPrice(29.99);
			productRepository.save(product3);

			
		};
	}
}
