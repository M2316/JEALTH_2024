package com.backend.jealth.service.user;

import com.backend.jealth.config.JwtConfig;
import com.backend.jealth.domain.user.RefreshEntity;
import com.backend.jealth.repository.user.RefreshRepository;
import com.backend.jealth.util.JWTUtil;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class ReissueService {

    private final JWTUtil jwtUtil;

    private final RefreshRepository refreshRepository;

    private final JwtConfig jwtConfig;

    @PersistenceContext
    private EntityManager entityManager;


    @Transactional
    public void deleteRefreshToken(String oldRefreshToken) {

        Query query = entityManager.createQuery("DELETE FROM RefreshEntity r WHERE r.refreshToken = :oldRefreshToken");
        query.setParameter("oldRefreshToken", oldRefreshToken);
        query.executeUpdate();

    }

    @Transactional
    public void saveRefreshToken(String userKey, String refreshToken, long expiredMs) {


        Date date = new Date(System.currentTimeMillis() + expiredMs);

        RefreshEntity refreshEntity = RefreshEntity.builder()
                .userKey(userKey)
                .refreshToken(refreshToken)
                .expiration(date.toString())
                .build();

        try {

            refreshRepository.save(refreshEntity);
            System.out.println("refreshEntity = " + refreshEntity.getId());
        }catch (ObjectOptimisticLockingFailureException e){
            entityManager.clear();
            throw e;
        }


    }


}
