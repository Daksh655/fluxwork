package com.fluxwork.core.common.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // 🚨 THE FIX: A permanent, hard-coded secret key!
    // (JJWT requires it to be at least 32 characters long)
    private final String SECRET_STRING = "FluxWorkSuperSecretKeyThatIsAtLeast32CharactersLong123!";

    // Now it builds the key using YOUR permanent string, not a random one!
    private final Key key = Keys.hmacShaKeyFor(SECRET_STRING.getBytes());

    // Token lasts for 24 hours
    private final long EXPIRATION_TIME = 86400000;

    // 1. Generate a new token
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // 2. Read the email out of the token
    public String extractEmail(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    // 3. Verify it isn't fake or expired
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            // Added this so if it ever fails again, Java tells you exactly why!
            System.out.println("⚠️ JWT Verification Failed: " + e.getMessage());
            return false;
        }
    }
}