package com.backend.jealth.util;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JWTUtil {


    @Value("${yml.type}")
    private String ymlType;

    private final SecretKey secretKey ;
    public JWTUtil(@Value("${spring.jwt.secret}") String secret){
        this.secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
    }

    public long getUserId(String token){
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("userId", Long.class);
    }
    public String getEmail(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("email", String.class);
    }
    public String getUserKey(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("userKey", String.class);
    }

    public String getRole(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("role", String.class);
    }

    public String getCategory(String token){

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("category", String.class);

    }

    public Boolean isExpired(String token) throws ExpiredJwtException {

        Boolean flag = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration().before(new Date());
        return flag;

    }

    public String createJwt(String category, String userKey, String role, Long expiredMs) {

        return Jwts.builder()
                .claim("category", category)
                .claim("userKey", userKey)
                .claim("role", role)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(secretKey)
                .compact();
    }


    public Cookie createCookie(String key, String value){
        System.out.println("ymlType : "+ymlType);
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24*60*60);

        //https 적용시 secure true로 변경
        if("prod".equals(ymlType)) {

            cookie.setSecure(true);
        }
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        return cookie;
    }



}
