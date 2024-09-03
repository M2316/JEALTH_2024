package com.backend.jealth.repository.health;

import com.backend.jealth.domain.health.HealthRoutineRecordEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecordRepository extends JpaRepository<HealthRoutineRecordEntity, Long> {


    List<HealthRoutineRecordEntity> findAllByAppUserIdAndWorkoutDateOrderByIdAsc(long userId, String workoutDate);


    @Query(nativeQuery = true, value =
            " select " +
                " id," +
                " app_user_id," +
                " routine_id," +
                " created_date," +
                " img_code," +
                " name," +
                " tag_level1," +
                " tag_level2," +
                " tag_level3," +
                " updated_date," +
                " workout_date  " +
            " from health_routine_record" +
            " where TO_CHAR(date_trunc('month',workout_date::date),'YYYY-MM') = :workoutDateMonth" +
                    " and app_user_id = :userId"

    )
    List<HealthRoutineRecordEntity> findAllByUserIdAndWorkoutDateMonthOrderById(long userId, String workoutDateMonth);

}
