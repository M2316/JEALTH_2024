package com.jealth.app.service.auth;

import com.jealth.app.domain.auth.RefreshToken;
import com.jealth.app.repository.auth.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;

    public RefreshToken findByRefreshToken(String refreshToken){
        return refreshTokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(()-> new IllegalArgumentException("Unexpected Token"));
    }
}
