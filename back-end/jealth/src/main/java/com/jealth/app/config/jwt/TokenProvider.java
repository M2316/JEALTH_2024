package com.jealth.app.config.jwt;

import com.jealth.app.domain.user.User;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Collections;
import java.util.Date;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class TokenProvider {

    private final JwtProperties jwtProperties;

    public String generateToken(User user, Duration expiredAt){
        Date now = new Date();

        return makeToken(new Date(now.getTime() + expiredAt.toMillis()),user);
    }


    public String makeToken(Date expiredAt, User user){
        Date now = new Date();

        JwtBuilder jwt = Jwts.builder()
                .setHeaderParam(Header.TYPE,Header.JWT_TYPE) //헤더 type : JWT
                .setIssuer(jwtProperties.getIssuer())
                .setIssuedAt(now)
                .setExpiration(expiredAt)
                .setSubject(user.getEmail())
                .claim("id",user.getId())
                .claim("email",user.getEmail())
                .signWith(SignatureAlgorithm.HS256,jwtProperties.getSecretKey());

        return jwt.compact();

    }

    public boolean validToken(String token){
        try{
            Jwts.parserBuilder()
                .setSigningKey(jwtProperties.getSecretKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    public Authentication getAuthentication(String token){
        Claims claims = getClaims(token);
        Set<SimpleGrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"));
        return new UsernamePasswordAuthenticationToken(new org.springframework.security.core.userdetails.User(claims.getSubject(),"",authorities),token, authorities);
    }

    public Long wgetUserId(String token){
        Claims claims = getClaims(token);
        return claims.get("id",Long.class);
    }

    private Claims getClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(jwtProperties.getSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
