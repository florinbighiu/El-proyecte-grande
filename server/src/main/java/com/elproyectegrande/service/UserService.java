package com.elproyectegrande.service;

import com.elproyectegrande.exceptions.UserNotFoundException;
import com.elproyectegrande.model.ApplicationUser;
import com.elproyectegrande.model.Role;
import com.elproyectegrande.repository.RoleRepository;
import com.elproyectegrande.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService implements UserDetailsService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository, RoleRepository roleRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        ApplicationUser user = userRepository.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }

        return user;
    }

    public List<ApplicationUser> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<ApplicationUser> getUserById(Integer userId) {
        return userRepository.findById(userId);
    }

    public ApplicationUser updateUserRole(Integer userId, String roleName) {
        ApplicationUser user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        Role role = roleRepository.findByAuthority(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));

        user.setAuthorities(Set.of(role));
        return userRepository.save(user);
    }

    public void deleteUser(Integer userId) {
        if (!userRepository.existsById(userId)) {
            throw new UserNotFoundException(userId);
        }
        userRepository.deleteById(userId);
    }

    public ApplicationUser updateEmail(String username, String newEmail) {
        ApplicationUser user = userRepository.findByUsername(username);

        if (!newEmail.equalsIgnoreCase(user.getEmail())) {
            if (userRepository.findByEmail(newEmail) != null) {
                throw new RuntimeException("Email is already registered");
            }
            user.setEmail(newEmail);
            userRepository.save(user);
        }

        return user;
    }

    public void changePassword(String username, String currentPassword, String newPassword) {
        ApplicationUser user = userRepository.findByUsername(username);

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        updatePassword(user, newPassword);
    }

    public void updateResetPassword(String token, String email, Instant expiresAt) {
        ApplicationUser applicationUser = userRepository.findByEmail(email);

        if (applicationUser != null) {
            applicationUser.setResetPasswordToken(token);
            applicationUser.setResetPasswordTokenExpiresAt(expiresAt);
            userRepository.save(applicationUser);
        } else {
            throw new RuntimeException("Could not find any user with email: " + email);
        }
    }

    public ApplicationUser getValidResetToken(String token) {
        ApplicationUser applicationUser = userRepository.findByResetPasswordToken(token);

        if (applicationUser == null || applicationUser.getResetPasswordTokenExpiresAt() == null) {
            return null;
        }

        if (applicationUser.getResetPasswordTokenExpiresAt().isBefore(Instant.now())) {
            return null;
        }

        return applicationUser;
    }

    public void updatePassword(ApplicationUser applicationUser, String newPassword) {
        String encodePassword = passwordEncoder.encode(newPassword);

        applicationUser.setPassword(encodePassword);
        applicationUser.setResetPasswordToken(null);
        applicationUser.setResetPasswordTokenExpiresAt(null);

        userRepository.save(applicationUser);

    }
}
