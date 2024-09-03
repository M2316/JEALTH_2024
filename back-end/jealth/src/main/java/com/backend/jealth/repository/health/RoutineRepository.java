package com.backend.jealth.repository.health;

import com.backend.jealth.domain.health.HealthRoutineListEntity;
import com.backend.jealth.domain.health.HealthRoutineListId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoutineRepository extends JpaRepository<HealthRoutineListEntity, HealthRoutineListId> {

    List<HealthRoutineListEntity> findByAppUserIdOrderByKey_routineIdxDesc(long appUserId);
    HealthRoutineListEntity findByKey_id(String id);
}
