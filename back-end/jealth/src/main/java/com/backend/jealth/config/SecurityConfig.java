package com.backend.jealth.config;

import com.backend.jealth.config.filter.CustomLogoutFilter;
import com.backend.jealth.config.filter.JWTFilter;
import com.backend.jealth.config.filter.LoginFilter;
import com.backend.jealth.config.oauth.Oauth2LoginSuccessHandler;
import com.backend.jealth.repository.user.RefreshRepository;
import com.backend.jealth.repository.user.UserRepository;
import com.backend.jealth.service.user.CustomOAuth2UserService;
import com.backend.jealth.service.user.ReissueService;
import com.backend.jealth.service.user.UserService;
import com.backend.jealth.util.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final RefreshRepository refreshRepository;

    private final AuthenticationConfiguration authenticationConfiguration;

    private final JWTUtil jwtUtil;

    private final UserRepository userRepository;
    private final UserService userService;

    private final Oauth2LoginSuccessHandler oauth2LoginSuccessHandler;

    private final JwtConfig jwtConfig;

    private final ReissueService reissueService;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf((auth) -> auth.disable())//csrf 설정 비활성화
                .cors((corsCustomizer -> corsCustomizer.configurationSource(new CorsConfigurationSource() {

                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {

                        CorsConfiguration configuration = new CorsConfiguration();

                        configuration.setAllowedOrigins(
                                Arrays.asList(
                                        "http://m2316homepc.ddns.net:5173",
                                        "https://jealth.store"
                                )
                        );
                        configuration.setAllowedMethods(Collections.singletonList("*"));
                        configuration.setAllowCredentials(true);
                        configuration.setAllowedHeaders(Collections.singletonList("*"));
                        configuration.setMaxAge(3600L);

                        configuration.setExposedHeaders(Collections.singletonList("Authorization"));

                        return configuration;
                    }
                })))
                .formLogin((auth) -> auth.disable())//formLogin 설정 비활성화
                .httpBasic((auth) -> auth.disable())//httpBasic 설정 비활성화
                .authorizeHttpRequests((auth) -> auth //요청에 대한 권한 설정
                        .requestMatchers("/login", "/api/v1/login", "/", "/api/v1/signup").permitAll()
                        .requestMatchers("/api/v1/reissue").permitAll()
                        .requestMatchers("/api/v1/emailAuthCodeSend").permitAll()
                        .requestMatchers("/api/v1/autoCodeCheck").permitAll()
                        .requestMatchers("/api/v1/passwordChange").permitAll()
                        .requestMatchers("/loginOauth/**").permitAll()
                        .requestMatchers("/admin").hasRole("ADMIN")
                        .anyRequest().authenticated())
                .oauth2Login((oauth2) -> oauth2
                        .userInfoEndpoint((userInfo) -> userInfo
                                .userService(new CustomOAuth2UserService(userRepository, userService))
                        ).successHandler(oauth2LoginSuccessHandler)
                )

                .addFilterBefore(new JWTFilter(jwtUtil, userRepository), UsernamePasswordAuthenticationFilter.class)
                //Form Login에 기본적으로 적용되어있는 UsernamePasswordAuthenticationFilter를 제거하고 새로 만든 LoginFilter를 추가
                .addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil, refreshRepository, userRepository, jwtConfig, reissueService), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new CustomLogoutFilter(refreshRepository, jwtUtil), LogoutFilter.class)

                .sessionManagement((auth) -> auth//세션 설정
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .build();
    }

}
