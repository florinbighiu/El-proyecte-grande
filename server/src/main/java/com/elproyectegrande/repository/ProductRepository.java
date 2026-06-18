package com.elproyectegrande.repository;

import java.util.List;

import com.elproyectegrande.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findProductByTitleContainingIgnoreCase(String title);

    /**
     * Paged + optionally filtered by category and/or title search. A null
     * parameter means "no filter on this field" — all done in the database so
     * the whole table is never loaded into memory.
     */
    @Query("""
            SELECT p FROM Product p
            WHERE (:category IS NULL OR LOWER(p.category) = LOWER(:category))
              AND (:search IS NULL OR LOWER(p.title) LIKE LOWER(CONCAT('%', :search, '%')))
            """)
    Page<Product> findFiltered(@Param("category") String category,
                               @Param("search") String search,
                               Pageable pageable);

    @Query("SELECT DISTINCT p.category FROM Product p WHERE p.category IS NOT NULL ORDER BY p.category")
    List<String> findDistinctCategories();
}
