package com.jealth.app.service.auth;

import com.jealth.app.config.jwt.TokenProvider;
import com.jealth.app.domain.auth.RefreshToken;
import com.jealth.app.domain.user.User;
import com.jealth.app.dto.auth.CreateAccessTokenRequest;
import com.jealth.app.repository.auth.RefreshTokenRepository;
import com.jealth.app.service.user.UserService;
import com.jealth.app.utils.CookieUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Arrays;

@RequiredArgsConstructor
@Service
public class TokenService {

    public static final String REFRESH_TOKEN_COOKIE_NAME = "refresh_token";
    public static final Duration REFRESH_TOKEN_DUTATION = Duration.ofDays(14);
    public static final Duration ACCESS_TOKEN_DURATION = Duration.ofMinutes(20);

    private final TokenProvider tokenProvider;
    private final RefreshTokenService refreshTokenService;
    private final UserService userService;
    private final BCryptPasswordEncoder encoder;
    private final RefreshTokenRepository refreshTokenRepository;



    public String login(CreateAccessTokenRequest createAccessTokenRequest, HttpServletRequest request, HttpServletResponse response) {

        //refresh token이 없을 때 로그인 요청 처리
        if(createAccessTokenRequest.getRefreshToken() == null){

            //인증 관련 설정이 있다면 설정값, 쿠키 제거
            if(request.getCookies() != null){
                Arrays.stream(request.getCookies()).forEach(cookie -> {
                    if(cookie.getName().equals(REFRESH_TOKEN_COOKIE_NAME)){
                        cookie.setMaxAge(0);
                        response.addCookie(cookie);
                    }
                });
            }

            //로그인 요청 처리
            User user = userService.findByEmail(createAccessTokenRequest.getEmail());

            //로그인 정보가 일치하지 않으면 예외 발생
            if(user != null && encoder.matches(createAccessTokenRequest.getPassword(),user.getPassword())){

                //리프레시 토큰 생성 -> 저장 -> 쿠키에 저장
                String refreshToken = tokenProvider.generateToken(user, REFRESH_TOKEN_DUTATION);
                saveRefreshToken(user.getId(), refreshToken);
                addRefreshTokenToCookie(request,response, refreshToken);

                return "Bearer " + tokenProvider.generateToken(user, ACCESS_TOKEN_DURATION);

            }else{
                throw new IllegalArgumentException("일치하는 로그인 정보가 없습니다.");
            }

        }else{
            // refresh token으로 access token 재발급
            return "Bearer " + this.createNewAccessToken(createAccessTokenRequest.getRefreshToken());
        }

    }




    public String createNewAccessToken(String refeshToken){
        //토큰 유효성 검사에 실패하면 예외 발생
        if(!tokenProvider.validToken(refeshToken)){
            throw new IllegalArgumentException("Unexpected Token");
        }


        Long userId = refreshTokenService.findByRefreshToken(refeshToken).getUserId();
        User user = userService.findById(userId);
        return tokenProvider.generateToken(user, Duration.ofHours(2));

    }



    //생성된 리프레시 토큰을 전달받아 데이터베이스에 저장
    private void saveRefreshToken(Long userId, String newRefreshToken){
        RefreshToken refreshToken = refreshTokenRepository.findByUserId(userId)
                .map(entity -> entity.update(newRefreshToken))
                .orElse(new RefreshToken(userId,newRefreshToken));

        refreshTokenRepository.save(refreshToken);
    }

    //생성된 리프레시 토큰을 쿠키에 저장
    private void addRefreshTokenToCookie(HttpServletRequest request, HttpServletResponse response, String refreshToken){
        int cookieMaxAge = (int) REFRESH_TOKEN_DUTATION.toSeconds();
        CookieUtil.deleteCookie(request,response,REFRESH_TOKEN_COOKIE_NAME);
        CookieUtil.addCookie(response, REFRESH_TOKEN_COOKIE_NAME, refreshToken, cookieMaxAge);
    }
}
