package com.backend.jealth.repository.user;

import com.backend.jealth.domain.user.EmailAuthCodeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface EmailAuthCodeRepository extends JpaRepository<EmailAuthCodeEntity, Long> {

    EmailAuthCodeEntity findFirstByEmailOrderByCreatedDateDesc(String email);

}
