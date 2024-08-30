package com.backend.jealth.config.filter;

import com.backend.jealth.DTO.user.CustomUserDetails;
import com.backend.jealth.domain.user.RefreshEntity;
import com.backend.jealth.domain.user.UserEntity;
import com.backend.jealth.repository.user.RefreshRepository;
import com.backend.jealth.repository.user.UserRepository;
import com.backend.jealth.util.JWTUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;


public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    private final JWTUtil jwtUtil;

    private final RefreshRepository refreshRepository;

    private final UserRepository userRepository;


    public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil, RefreshRepository refreshRepository, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.refreshRepository = refreshRepository;
        this.userRepository = userRepository;
        setFilterProcessesUrl("/api/v1/login");
    }
    @Override
    public Authentication attemptAuthentication(@RequestBody HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        //클라이언트 요청에서 보내진 email을 통해 userKey 조회
        String email = request.getParameter("email");
        String userKey = userRepository.findUserKeyByEmail(email);
        //request에서 password 추출
        String password = obtainPassword(request);

        //스프링 시큐리티에서 email과 password를 검증하기 위해서는 token에 담아야 함
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userKey, password, null);

        //token에 담은 검증을 위한 AuthenticationManager로 전달

        Authentication authentication = authenticationManager.authenticate(authToken);

//        return authenticationManager.authenticate(authToken);
        return authentication;
    }


    @Override//로그인 성공시 실행하는 메소드 (여기서 JWT를 발급하면 됨)
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {

        //UserDetailsS
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        String userKey = customUserDetails.getUsername();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        // 600000L = 10분
        String accessToken = jwtUtil.createJwt("access",userKey, role, 60*10*1000L);
        String refreshToken = jwtUtil.createJwt("refresh",userKey, role, 60*10*1000L);

        //Refresh 토큰 저장 DB에 기존의 Refresh 토큰 삭제 후 새 Refresh 토큰 저장
        refreshRepository.deleteByRefreshToken(refreshToken);
        addRefreshEntity(userKey, refreshToken, 60*10*1000L);

        //헤더에 토큰을 담아서 클라이언트에게 전달
        response.setHeader("access-token", accessToken);
        response.addCookie(createCookie("refresh-token", refreshToken));
        response.setStatus(HttpStatus.OK.value());
    }
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        response.setStatus(401);
    }

    private void addRefreshEntity(String userKey, String refreshToken, long expiredMs){
        Date date = new Date(System.currentTimeMillis() + expiredMs);

        RefreshEntity refreshEntity = new RefreshEntity();
        refreshEntity.setUserKey(userKey);
        refreshEntity.setRefreshToken(refreshToken);
        refreshEntity.setExpiration(date.toString());

        refreshRepository.save(refreshEntity);

    }


    private Cookie createCookie(String key, String value){
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24*60*60);
        //https 적용시 secure true로 변경
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        return cookie;
    }

}
