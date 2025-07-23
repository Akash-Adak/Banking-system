package com.banking.transaction.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private PublicKey publicKey;

    @PostConstruct
    public void loadPublicKey() {
        try {
            var resource = new ClassPathResource("public.key");
            String keyString = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);

            keyString = keyString
                    .replace("-----BEGIN PUBLIC KEY-----", "")
                    .replace("-----END PUBLIC KEY-----", "")
                    .replaceAll("\\s", "");

            byte[] decodedKey = Base64.getDecoder().decode(keyString);
            X509EncodedKeySpec keySpec = new X509EncodedKeySpec(decodedKey);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            this.publicKey = keyFactory.generatePublic(keySpec);
            log.info("Public key loaded successfully for JWT verification.");
        } catch (Exception e) {
            log.error("Failed to load public key: {}", e.getMessage(), e);
            throw new IllegalStateException("Failed to initialize JWT public key.", e);
        }
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authorizationHeader.substring(7);

        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(publicKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            String username = claims.getSubject(); // sub claim
            String role = claims.get("role", String.class); // custom claim

            if (username != null && role != null) {
                SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role.toUpperCase());

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        username,
                        null,
                        Collections.singletonList(authority));

                SecurityContextHolder.getContext().setAuthentication(authentication);
                log.debug("User '{}' authenticated with role '{}'", username, role);
            } else {
                log.warn("JWT token valid but missing username or role claims. Token: {}", token);
            }

        } catch (JwtException e) {
            log.warn("Invalid JWT token: {}", e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Unauthorized: Invalid or expired token.");
            return;
        } catch (Exception e) {
            log.error("An unexpected error occurred during JWT processing: {}", e.getMessage(), e);
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("Internal Server Error: Could not process token.");
            return;
        }

        filterChain.doFilter(request, response);
    }
}
