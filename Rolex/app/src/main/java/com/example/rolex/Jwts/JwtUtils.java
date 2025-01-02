package com.example.rolex.Jwts;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;

public class JwtUtils {

    public static Claims decodeToken(String token) {
        return Jwts.parser()
                .setSigningKey("NanhHungry64ByteLongSecureSecretKey")
                .parseClaimsJws(token)
                .getBody();
    }
}

