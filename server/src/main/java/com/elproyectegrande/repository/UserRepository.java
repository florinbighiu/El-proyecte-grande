package com.elproyectegrande.repository;

import com.elproyectegrande.model.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<ApplicationUser, Integer> {
    ApplicationUser findByUsername(String username);

    ApplicationUser findByResetPasswordToken(String token);

    ApplicationUser findByEmail(String email);

}
