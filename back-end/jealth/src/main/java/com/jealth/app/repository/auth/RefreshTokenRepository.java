package com.jealth.app.repository.auth;

import com.jealth.app.domain.auth.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long>{
    Optional<RefreshToken> findByUserId(Long userId);
    Optional<RefreshToken> findByRefreshToken(String refreshToken);
}
