package com.elproyectegrande.service;

import com.elproyectegrande.model.ApplicationUser;
import com.elproyectegrande.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            return userRepository.findByUsername(username);

        } catch (UsernameNotFoundException ex) {
            System.out.println("Username not found: " + ex.getMessage());
            throw ex;
        }
    }

    public List<ApplicationUser> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<ApplicationUser> getUserById(Integer userId) {
        return userRepository.findById(userId);
    }

    public void updateResetPassword(String token, String email) {
        ApplicationUser applicationUser = userRepository.findByEmail(email);

        if (applicationUser != null) {
            applicationUser.setResetPasswordToken(token);
            userRepository.save(applicationUser);
        } else {
            throw new RuntimeException("Could not find any user with email: " + email);
        }
    }

    public ApplicationUser getToken(String resetPasswordToken) {
        return userRepository.findByResetPasswordToken(resetPasswordToken);
    }

    public void updatePassword(ApplicationUser applicationUser, String newPassword) {
        String encodePassword = passwordEncoder.encode(newPassword);

        applicationUser.setPassword(encodePassword);
        applicationUser.setResetPasswordToken(null);

        userRepository.save(applicationUser);

    }
}
