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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

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

    public ApplicationUser registerUser(String username, String password, String email) {

        String encodedPassword = passwordEncoder.encode(password);
        Role userRole = roleRepository.findByAuthority("USER").get();

        Set<Role> authorities = new HashSet<>();

        authorities.add(userRole);

        return userRepository.save(new ApplicationUser(0, username, encodedPassword, authorities, null, email));
    }


    public LoginResponseDTO loginUser(String username, String password) {
        Optional<ApplicationUser> userOptional = userRepository.findByUsername(username);
    
        if (userOptional.isEmpty()) {
            throw new AuthenticationException("User not found");
        }
    
        ApplicationUser user = userOptional.get();
    
        if (passwordEncoder.matches(password, user.getPassword())) {
            try {
                Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
                );
    
                String token = tokenService.generateJwt(auth);
    
                return new LoginResponseDTO(user, token);
            } catch (AuthenticationException e) {
                throw new AuthenticationException("Authentication failed");
            }
        } else {
            throw new AuthenticationException("Invalid username or password");
        }
    }


}
