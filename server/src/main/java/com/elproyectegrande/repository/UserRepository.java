package com.elproyectegrande.repository;

import com.elproyectegrande.model.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<ApplicationUser, Integer> {
    Optional<ApplicationUser> findByUsername(String username);

    Optional<ApplicationUser> findByResetPasswordToken(String token);

    Optional<ApplicationUser> findByEmail(String email);

    List<ApplicationUser> findAll();
}
