package com.backend.jealth.repository.user;

import com.backend.jealth.domain.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {


    Boolean existsByUserKey(String userKey);
    UserEntity findByUserKey(String userKey);

    @Query("SELECT u.userKey FROM UserEntity u WHERE u.email = :email")
    String findUserKeyByEmail(@Param("email") String email);

    long countAllBy();

    Optional<UserEntity> findByEmail(String email);

    Boolean existsByEmail(String email);

    UserEntity findByGoogleUserKey(String userKey);
    UserEntity findByKakaoUserKey(String userKey);
    UserEntity findByFacebookUserKey(String userKey);
}
