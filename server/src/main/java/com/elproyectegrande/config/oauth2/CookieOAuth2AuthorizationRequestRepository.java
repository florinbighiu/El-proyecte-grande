package com.elproyectegrande.config.oauth2;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Bridges the in-flight OAuth2AuthorizationRequest across the provider redirect even though
 * SecurityConfiguration runs with SessionCreationPolicy.STATELESS (so there is no HttpSession for
 * Spring's default session-backed repository to use).
 *
 * The cookie holds only a random opaque id — never the request itself — so the callback never has
 * to deserialize client-supplied bytes back into a Java object (which would otherwise be an
 * insecure-deserialization / gadget-chain risk, since cookie values are fully attacker-controlled).
 * The actual request is kept server-side in a short-lived cache keyed by that id.
 */
public class CookieOAuth2AuthorizationRequestRepository implements AuthorizationRequestRepository<OAuth2AuthorizationRequest> {

    public static final String AUTHORIZATION_REQUEST_COOKIE_NAME = "oauth2_auth_request";
    private static final int REQUEST_TTL_SECONDS = 180;

    private final Map<String, CacheEntry> pendingRequests = new ConcurrentHashMap<>();

    private record CacheEntry(OAuth2AuthorizationRequest authorizationRequest, Instant expiresAt) {
        boolean isExpired() {
            return Instant.now().isAfter(expiresAt);
        }
    }

    @Override
    public OAuth2AuthorizationRequest loadAuthorizationRequest(HttpServletRequest request) {
        return getCookie(request)
                .map(Cookie::getValue)
                .map(this::lookup)
                .orElse(null);
    }

    @Override
    public void saveAuthorizationRequest(OAuth2AuthorizationRequest authorizationRequest,
                                          HttpServletRequest request, HttpServletResponse response) {
        if (authorizationRequest == null) {
            removeAuthorizationRequestCookies(request, response);
            return;
        }

        evictExpired();
        String id = UUID.randomUUID().toString();
        pendingRequests.put(id, new CacheEntry(authorizationRequest, Instant.now().plusSeconds(REQUEST_TTL_SECONDS)));
        addCookie(response, id);
    }

    @Override
    public OAuth2AuthorizationRequest removeAuthorizationRequest(HttpServletRequest request, HttpServletResponse response) {
        Optional<String> id = getCookie(request).map(Cookie::getValue);
        OAuth2AuthorizationRequest authorizationRequest = id.map(this::lookup).orElse(null);
        id.ifPresent(pendingRequests::remove);
        removeAuthorizationRequestCookies(request, response);
        return authorizationRequest;
    }

    public void removeAuthorizationRequestCookies(HttpServletRequest request, HttpServletResponse response) {
        deleteCookie(request, response);
    }

    private OAuth2AuthorizationRequest lookup(String id) {
        CacheEntry entry = pendingRequests.get(id);
        if (entry == null || entry.isExpired()) {
            pendingRequests.remove(id);
            return null;
        }
        return entry.authorizationRequest();
    }

    private void evictExpired() {
        pendingRequests.values().removeIf(CacheEntry::isExpired);
    }

    private static Optional<Cookie> getCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(AUTHORIZATION_REQUEST_COOKIE_NAME)) {
                    return Optional.of(cookie);
                }
            }
        }
        return Optional.empty();
    }

    private static void addCookie(HttpServletResponse response, String value) {
        Cookie cookie = new Cookie(AUTHORIZATION_REQUEST_COOKIE_NAME, value);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(REQUEST_TTL_SECONDS);
        response.addCookie(cookie);
    }

    private static void deleteCookie(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return;
        }
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(AUTHORIZATION_REQUEST_COOKIE_NAME)) {
                cookie.setValue("");
                cookie.setPath("/");
                cookie.setMaxAge(0);
                response.addCookie(cookie);
            }
        }
    }
}
