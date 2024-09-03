package com.backend.jealth.service.health;

import com.backend.jealth.DTO.health.routine.RoutineRequest;
import com.backend.jealth.DTO.health.routine.RoutineResponse;
import com.backend.jealth.domain.health.HealthRoutineListEntity;
import com.backend.jealth.domain.health.HealthRoutineListId;
import com.backend.jealth.repository.health.RoutineRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoutineService {

    private final RoutineRepository routineRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public List<RoutineResponse> getRoutineList(long userId) {

        List<HealthRoutineListEntity> routineList = routineRepository.findByAppUserIdOrderByKey_routineIdxDesc(userId);
        List<RoutineResponse> response = routineList.stream().map(routine ->
                RoutineResponse.builder()
                        .id(routine.getKey().getId())
                        .name(routine.getName())
                        .imgCode(routine.getImgCode())
                        .tagLevel1(routine.getTagLevel1())
                        .tagLevel2(routine.getTagLevel2())
                        .tagLevel3(routine.getTagLevel3())
                        .build()
        ).toList();

        return response;
    }


    @Transactional
    public void updateRoutine(RoutineRequest routineRequest) {
        HealthRoutineListEntity routine = routineRepository.findByKey_id(routineRequest.getId());

        if(routine == null){
            //신규 루틴일 경우
                routine = HealthRoutineListEntity.builder()
                        .key(
                                HealthRoutineListId.builder()
                                        .id(routineRequest.getId())
                                        .routineIdx(generateNextId())
                                        .build()
                        )
                        .appUserId(routineRequest.getAppUserId())
                        .name(routineRequest.getName())
                        .imgCode(routineRequest.getImgCode())
                        .tagLevel1(routineRequest.getTagLevel1())
                        .tagLevel2(routineRequest.getTagLevel2())
                        .tagLevel3(routineRequest.getTagLevel3())
                        .build();

        }else{
            //기존 루틴 수정일 경우
            routine.setName(routineRequest.getName());
            routine.setImgCode(routineRequest.getImgCode());
            routine.setTagLevel1(routineRequest.getTagLevel1());
            routine.setTagLevel2(routineRequest.getTagLevel2());
            routine.setTagLevel3(routineRequest.getTagLevel3());
        }

        routineRepository.save(routine);
    }



    public void deleteRoutine(RoutineRequest routineRequest) {
        HealthRoutineListEntity routine = routineRepository.findByKey_id(routineRequest.getId());

        if(routine != null){
            routineRepository.delete(routine);
        }

    }


    //시퀀스 로직
    private Long generateNextId() {
        Query query = entityManager.createNativeQuery("SELECT nextval('health_routine_id_seq')");
        return ((Number) query.getSingleResult()).longValue();
    }
}
