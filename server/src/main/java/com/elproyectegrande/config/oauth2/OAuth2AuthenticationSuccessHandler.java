package com.elproyectegrande.config.oauth2;

import com.elproyectegrande.model.ApplicationUser;
import com.elproyectegrande.model.Role;
import com.elproyectegrande.repository.RoleRepository;
import com.elproyectegrande.repository.UserRepository;
import com.elproyectegrande.service.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Finds-or-creates an ApplicationUser for the authenticated social-login identity, then issues the
 * exact same kind of JWT TokenService hands out for username/password logins (by wrapping the user
 * in a UsernamePasswordAuthenticationToken first) so the rest of the app can't tell the two apart.
 */
@Component
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenService tokenService;

    @Value("${app.oauth2.redirect-uri}")
    private String redirectUri;

    @Override
    @Transactional
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");

        if (email == null || email.isBlank()) {
            redirect(response, UriComponentsBuilder.fromUriString(redirectUri)
                    .queryParam("error", "Your social account did not share an email address with us, so we can't sign you in. Please try a different method."));
            return;
        }

        ApplicationUser user = userRepository.findByEmail(email);
        if (user == null) {
            user = createUser(email, oAuth2User);
        }

        Authentication appAuthentication = new UsernamePasswordAuthenticationToken(user.getUsername(), null, user.getAuthorities());
        String token = tokenService.generateJwt(appAuthentication);
        String roles = user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        redirect(response, UriComponentsBuilder.fromUriString(redirectUri)
                .queryParam("token", token)
                .queryParam("userId", user.getUserId())
                .queryParam("role", roles));
    }

    private ApplicationUser createUser(String email, OAuth2User oAuth2User) {
        Role userRole = roleRepository.findByAuthority("USER")
                .orElseThrow(() -> new RuntimeException("USER role not found"));

        Set<Role> authorities = new HashSet<>();
        authorities.add(userRole);

        String username = generateUniqueUsername(email, oAuth2User);
        // Social-login accounts authenticate via the provider, never with a local password —
        // store a random BCrypt hash so the column stays non-null without a usable credential.
        String randomPassword = passwordEncoder.encode(UUID.randomUUID().toString());

        return userRepository.save(new ApplicationUser(null, username, randomPassword, authorities, null, email));
    }

    private String generateUniqueUsername(String email, OAuth2User oAuth2User) {
        String preferred = firstNonBlank(
                oAuth2User.getAttribute("login"),
                oAuth2User.getAttribute("name"),
                email.substring(0, email.indexOf('@')));

        String base = preferred.toLowerCase().replaceAll("[^a-z0-9._-]", "");
        if (base.isBlank()) {
            base = "user";
        }

        String candidate = base;
        int suffix = 1;
        while (userRepository.findByUsername(candidate) != null) {
            candidate = base + suffix++;
        }
        return candidate;
    }

    private static String firstNonBlank(String... values) {
        for (String value : values) {
            if (value != null && !value.isBlank()) {
                return value;
            }
        }
        return "";
    }

    private void redirect(HttpServletResponse response, UriComponentsBuilder targetBuilder) throws IOException {
        response.sendRedirect(targetBuilder.build().encode().toUriString());
    }
}
