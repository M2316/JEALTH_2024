package com.backend.jealth.repository.health;

import com.backend.jealth.domain.health.HealthRoutineSetScoreEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ScoreRepository extends JpaRepository<HealthRoutineSetScoreEntity, Long> {

    List<HealthRoutineSetScoreEntity> findAllByHealthRoutineRecordIdOrderBySetNumAsc(long healthRoutineRecordId);


    HealthRoutineSetScoreEntity findByHealthRoutineRecordIdAndSetNum(long healthRoutineRecordId, int setNum);


    @Query("SELECT e FROM HealthRoutineSetScoreEntity e WHERE e.healthRoutineRecordId = :recordId AND e.setNum = (SELECT MAX(e2.setNum) FROM HealthRoutineSetScoreEntity e2 WHERE e2.healthRoutineRecordId = :recordId)")
    HealthRoutineSetScoreEntity findByMaxSetNum(@Param("recordId") Long recordId);

}
