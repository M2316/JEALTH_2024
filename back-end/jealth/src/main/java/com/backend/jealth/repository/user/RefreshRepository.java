package com.backend.jealth.repository.user;

import com.backend.jealth.domain.user.RefreshEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RefreshRepository extends JpaRepository<RefreshEntity, Long> {

    Boolean existsByRefreshToken(String refreshToken);

//    @Query("DELETE FROM RefreshEntity r WHERE r.refreshToken = :oldRefreshToken")
//    void deleteByOldRefreshToken(String oldRefreshToken);

    void deleteByRefreshToken(String refreshToken);

//    RefreshEntity findTop1ByRefreshToken(String refreshToken);



}
