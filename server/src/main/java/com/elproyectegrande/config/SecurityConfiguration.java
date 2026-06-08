package com.elproyectegrande.config;

import com.elproyectegrande.utils.RSAKeyProperties;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.http.HttpMethod;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.Customizer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.beans.factory.annotation.Value;
import java.util.Arrays;
import java.util.List;

@Configuration
public class SecurityConfiguration {

    private final RSAKeyProperties keys;

    @Value("${app.cors.allowed-origins:http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:5176}")
    private String allowedOrigins;

    public SecurityConfiguration(RSAKeyProperties keys) {
        this.keys = keys;
    }

    @Bean
    static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authManager(UserDetailsService detailsService) {
        DaoAuthenticationProvider daoProvider = new DaoAuthenticationProvider();
        daoProvider.setUserDetailsService(detailsService);
        daoProvider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(daoProvider);
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/auth/**").permitAll();
                    auth.requestMatchers("/home/**").permitAll();
                    auth.requestMatchers(HttpMethod.GET, "/products/**").permitAll();
                    auth.requestMatchers(HttpMethod.POST, "/products/**").hasRole("ADMIN");
                    auth.requestMatchers(HttpMethod.PUT, "/products/**").hasRole("ADMIN");
                    auth.requestMatchers(HttpMethod.DELETE, "/products/**").hasRole("ADMIN");
                    auth.requestMatchers("/cart/add/**").permitAll();
                    auth.requestMatchers("/cart/remove/**").permitAll();
                    auth.requestMatchers("/cart/update/**").permitAll();
                    auth.requestMatchers("/cart/items/**").permitAll();
                    auth.requestMatchers("/cart/clear/**").permitAll();
                    auth.requestMatchers("/email/**").permitAll();
                    auth.requestMatchers("/users/all").hasRole("ADMIN");
                    auth.requestMatchers("/users/**").authenticated();
                    auth.requestMatchers("/admin/**").hasRole("ADMIN");
                    auth.requestMatchers("/actuator/health").permitAll();
                    auth.anyRequest().authenticated();
                });

        http
                .oauth2ResourceServer(server -> server
                        .jwt(jwt -> jwt
                                .jwtAuthenticationConverter(jwtAuthenticationConverter())));
        http
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }

    @Bean
    JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withPublicKey(keys.getPublicKey()).build();
    }

    @Bean
    static JwtEncoder jwtEncoder(RSAKeyProperties keys) {
        JWK jwk = new RSAKey.Builder(keys.getPublicKey()).privateKey(keys.getPrivateKey()).build();
        JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(new JWKSet(jwk));
        return new NimbusJwtEncoder(jwks);
    }

    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthoritiesClaimName("roles");
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");
        JwtAuthenticationConverter jwtConverter = new JwtAuthenticationConverter();
        jwtConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);
        return jwtConverter;
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(Arrays.stream(allowedOrigins.split(",")).map(String::trim).toList());
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(false);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }



}