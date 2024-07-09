package com.jealth.app.config;

import com.jealth.app.config.jwt.TokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class TokenAuthenticationFilter extends OncePerRequestFilter {
    private final TokenProvider tokenProvider;
    private final static String HEADER_AUTHORICATION = "Authorization";
    private final static String HEADER_BEARER = "Bearer";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // 요청 헤더의 Authorization 값 가져오기
        String authorizationHeader = request.getHeader(HEADER_AUTHORICATION);
        // 가져온 값에서 접두사 제거
        String token = getAccessToken(authorizationHeader);
        // 가져온 토큰이 유효한지 확인하고, 유효한 때는 인증 정보 설정
        if(tokenProvider.validToken(token)){
            Authentication authentication = tokenProvider.getAuthentication(token);
            SecurityContextHolder
                    .getContext()
                    .setAuthentication(authentication);
        }
        filterChain.doFilter(request,response);
    }

    private String getAccessToken(String authorizationHeader){
        if(authorizationHeader == null || !authorizationHeader.startsWith(HEADER_BEARER)){
            return null;
        }
        return authorizationHeader.substring(HEADER_BEARER.length());
    }
}
