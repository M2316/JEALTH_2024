package com.backend.jealth.repository.user;

import com.backend.jealth.domain.user.RefreshEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshRepository extends JpaRepository<RefreshEntity, Long> {

    Boolean existsByRefreshToken(String refreshToken);
    @Transactional
    void deleteByRefreshToken(String refreshToken);

}
