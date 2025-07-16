package com.banking.authentication.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.Date;
import java.util.Map;

@Component
public class JwtUtil {

    @Value("${jwt.expiration}")
    private long expirationTime;

    private PrivateKey getPrivateKey() throws Exception {
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("private.key");
        if (inputStream == null) throw new FileNotFoundException("private.key not found in resources");

        String key = new String(inputStream.readAllBytes())
                .replaceAll("-----\\w+ PRIVATE KEY-----", "")
                .replaceAll("\\s", "");

        byte[] decoded = Base64.getDecoder().decode(key);
        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(decoded);
        return KeyFactory.getInstance("RSA").generatePrivate(keySpec);
    }


    private PublicKey getPublicKey() throws Exception {
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("public.key");
        if (inputStream == null) throw new FileNotFoundException("public.key not found in resources");

        String key = new String(inputStream.readAllBytes())
                .replaceAll("-----\\w+ PUBLIC KEY-----", "")
                .replaceAll("\\s", "");

        byte[] decoded = Base64.getDecoder().decode(key);
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(decoded);
        return KeyFactory.getInstance("RSA").generatePublic(keySpec);
    }


    public String generateToken(Map<String, Object> claims, String subject) throws Exception {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(getPrivateKey(), SignatureAlgorithm.RS256)
                .compact();
    }

    public Claims validateToken(String token) throws Exception {
        return Jwts.parserBuilder()
                .setSigningKey(getPublicKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
