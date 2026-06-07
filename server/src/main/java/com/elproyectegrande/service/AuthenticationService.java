package com.elproyectegrande.service;


import com.elproyectegrande.model.ApplicationUser;
import com.elproyectegrande.model.LoginResponseDTO;
import com.elproyectegrande.model.Role;
import com.elproyectegrande.repository.RoleRepository;
import com.elproyectegrande.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import com.elproyectegrande.exceptions.AuthenticationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
@Transactional
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserService userService;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.mail.from}")
    private String mailFrom;

    @Value("${app.frontend.base-url}")
    private String frontendBaseUrl;

    private static final Duration RESET_TOKEN_TTL = Duration.ofHours(1);

    public ApplicationUser registerUser(String username, String password, String email) {

        if (userRepository.findByUsername(username) != null) {
            throw new RuntimeException("Username is already taken");
        }
        if (email != null && !email.isBlank() && userRepository.findByEmail(email) != null) {
            throw new RuntimeException("Email is already registered");
        }

        String encodedPassword = passwordEncoder.encode(password);
        Role userRole = roleRepository.findByAuthority("USER")
                .orElseThrow(() -> new RuntimeException("USER role not found"));

        Set<Role> authorities = new HashSet<>();

        authorities.add(userRole);

        return userRepository.save(new ApplicationUser(null, username, encodedPassword, authorities, null, email));
    }


    public LoginResponseDTO loginUser(String username, String password) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password));

            ApplicationUser user = userRepository.findByUsername(username);
            String token = tokenService.generateJwt(auth);

            return new LoginResponseDTO(user, token);
        } catch (org.springframework.security.core.AuthenticationException e) {
            throw new AuthenticationException("Invalid username or password");
        }
    }

    public void requestPasswordReset(String email) {
        ApplicationUser user = userRepository.findByEmail(email);

        // Always behave the same whether or not the address is registered, so the response can't
        // be used to enumerate which emails have accounts.
        if (user != null) {
            String token = UUID.randomUUID().toString();
            userService.updateResetPassword(token, email, Instant.now().plus(RESET_TOKEN_TTL));
            sendPasswordResetEmail(user, token);
        }
    }

    public void confirmPasswordReset(String token, String newPassword) {
        ApplicationUser user = userService.getValidResetToken(token);

        if (user == null) {
            throw new RuntimeException("Reset link is invalid or has expired");
        }

        userService.updatePassword(user, newPassword);
    }

    private void sendPasswordResetEmail(ApplicationUser user, String token) {
        String resetLink = frontendBaseUrl + "/reset?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(mailFrom);
        message.setTo(user.getEmail());
        message.setSubject("Reset your password");
        message.setText("Hi " + user.getUsername() + ",\n\n"
                + "We received a request to reset the password for your account. "
                + "Click the link below to choose a new one:\n\n"
                + resetLink + "\n\n"
                + "This link expires in one hour. If you didn't request this, you can safely ignore this email.");

        mailSender.send(message);
    }

}
