package com.elproyectegrande.config.oauth2;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Component
public class OAuth2AuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Value("${app.oauth2.redirect-uri}")
    private String redirectUri;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception)
            throws IOException {
        String message = exception.getLocalizedMessage() != null
                ? exception.getLocalizedMessage()
                : "Social sign-in failed. Please try again.";

        String target = UriComponentsBuilder.fromUriString(redirectUri)
                .queryParam("error", message)
                .build()
                .encode()
                .toUriString();

        response.sendRedirect(target);
    }
}
