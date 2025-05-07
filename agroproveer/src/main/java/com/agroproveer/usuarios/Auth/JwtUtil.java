package com.agroproveer.usuarios.Auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long jwtExpirationMs;

    // 🔥 Generar token para un usuario
    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())  // el usuario es el "subject"
                .setIssuedAt(new Date())                // fecha de creación
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs)) // vencimiento
                .signWith(getSignKey(), SignatureAlgorithm.HS256) // firmar con clave secreta
                .compact();
    }

    // 🔎 Obtener usuario desde el token
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    // ✅ Verificar si el token es válido
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // 🔒 Extraer claims
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // ⏰ Comprobar expiración
    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    // 🔑 Clave secreta para firmar
    private Key getSignKey() {
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
