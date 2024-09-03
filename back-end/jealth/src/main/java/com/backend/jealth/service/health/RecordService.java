package com.backend.jealth.service.health;

import com.backend.jealth.DTO.health.record.RecordRequest;
import com.backend.jealth.DTO.health.record.RecordResponse;
import com.backend.jealth.DTO.health.record.ScoreRequest;
import com.backend.jealth.DTO.health.record.ScoreResponse;
import com.backend.jealth.DTO.health.routine.RoutineRequest;
import com.backend.jealth.domain.health.HealthRoutineListEntity;
import com.backend.jealth.domain.health.HealthRoutineRecordEntity;
import com.backend.jealth.domain.health.HealthRoutineSetScoreEntity;
import com.backend.jealth.repository.health.RecordRepository;
import com.backend.jealth.repository.health.ScoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@RequiredArgsConstructor
public class RecordService {

    private final RecordRepository recordRepository;
    private final ScoreRepository scoreRepository;

    public List<RecordResponse> getRecordList(long userId, String workoutDateMonth) {

        List<RecordResponse> recordList = recordRepository.findAllByUserIdAndWorkoutDateMonthOrderById(userId, workoutDateMonth).stream()
                .map(record -> RecordResponse.builder()
                        .id(record.getId())
                        .name(record.getName())
                        .workoutDate(record.getWorkoutDate())
                        .imgCode(record.getImgCode())
                        .tagLevel1(record.getTagLevel1())
                        .tagLevel2(record.getTagLevel2())
                        .tagLevel3(record.getTagLevel3())
                        .build()
                ).toList();

        recordList.stream().forEach(record -> {
            List<HealthRoutineSetScoreEntity> scoreEntityList = scoreRepository.findAllByHealthRoutineRecordIdOrderBySetNumAsc(record.getId());

            List<ScoreResponse> scoreResponseList = scoreEntityList.stream()
                    .map(scoreEntity -> ScoreResponse.builder()
                                    .id(scoreEntity.getId())
                                    .setNum(scoreEntity.getSetNum())
                                    .appUserId(scoreEntity.getAppUserId())
                                    .weight(scoreEntity.getWeight())
                                    .weightUnit(scoreEntity.getWeightUnit())
                                    .setDoneFlag(scoreEntity.getSetDoneFlag())
                                    .count(scoreEntity.getCount())
                                    .countUnit(scoreEntity.getCountUnit())
                                    .healthRoutineRecordId(scoreEntity.getHealthRoutineRecordId())
                            .build()
                    ).toList();
            record.setScoreList(scoreResponseList);


        });

        return recordList;


    }

    public void appendRecord(List<RecordRequest> recordRequestList, long userId) {


        List<HealthRoutineRecordEntity> recordEntityList = recordRequestList.stream()
                        .map(record -> HealthRoutineRecordEntity.builder()
                                .appUserId(userId)
                                .routineId(record.getId())
                                .name(record.getName())
                                .workoutDate(record.getWorkoutDate())
                                .imgCode(record.getImgCode())
                                .tagLevel1(record.getTagLevel1())
                                .tagLevel2(record.getTagLevel2())
                                .tagLevel3(record.getTagLevel3())
                                .build()
                        ).toList();


        recordRepository.saveAll(recordEntityList);






        recordRequestList.stream().forEach(request ->{

            HealthRoutineRecordEntity item = recordEntityList.stream().filter(entity-> entity.getRoutineId().equals(request.getId())).findFirst().get();

            ScoreRequest score = request.getScoreList().get(0);

            score.setHealthRoutineRecordId(item.getId());

            HealthRoutineSetScoreEntity scoreEntity = HealthRoutineSetScoreEntity.builder()
                    .appUserId(userId)
                    .healthRoutineRecordId(score.getHealthRoutineRecordId())
                    .setNum(score.getSetNum())
                    .weight(score.getWeight())
                    .weightUnit(score.getWeightUnit())
                    .count(score.getCount())
                    .countUnit(score.getCountUnit())
                    .setDoneFlag(false)
                    .build();

            scoreRepository.save(scoreEntity);

        });

    }


    public void appendScore(Long recordId) {

        HealthRoutineSetScoreEntity copySetScore = scoreRepository.findByMaxSetNum(recordId);

        HealthRoutineSetScoreEntity newSet = HealthRoutineSetScoreEntity.builder()
                .appUserId(copySetScore.getAppUserId())
                .healthRoutineRecordId(copySetScore.getHealthRoutineRecordId())
                .setNum(copySetScore.getSetNum()+1)
                .weight(copySetScore.getWeight())
                .weightUnit(copySetScore.getWeightUnit())
                .count(copySetScore.getCount())
                .countUnit(copySetScore.getCountUnit())
                .setDoneFlag(false)
                .build();


        scoreRepository.save(newSet);




    }

    public void updateScore(ScoreRequest scoreRequest) {

        HealthRoutineSetScoreEntity scoreEntity = scoreRepository.findByHealthRoutineRecordIdAndSetNum(scoreRequest.getHealthRoutineRecordId(), scoreRequest.getSetNum());

        scoreEntity.setWeight(scoreRequest.getWeight());
        scoreEntity.setWeightUnit(scoreRequest.getWeightUnit());
        scoreEntity.setCount(scoreRequest.getCount());
        scoreEntity.setCountUnit(scoreRequest.getCountUnit());

        scoreRepository.save(scoreEntity);
    }

    public void updateScoreDoneToggle(ScoreRequest scoreRequest) {

        HealthRoutineSetScoreEntity scoreEntity = scoreRepository.findByHealthRoutineRecordIdAndSetNum(scoreRequest.getHealthRoutineRecordId(), scoreRequest.getSetNum());

        scoreEntity.setSetDoneFlag(!scoreEntity.getSetDoneFlag());

        scoreRepository.save(scoreEntity);


    }

    public void deleteRecord(ScoreRequest scoreRequest) {



        HealthRoutineSetScoreEntity deleteScoreEntity = scoreRepository.findByHealthRoutineRecordIdAndSetNum(scoreRequest.getHealthRoutineRecordId(), scoreRequest.getSetNum());

        scoreRepository.delete(deleteScoreEntity);

        List<HealthRoutineSetScoreEntity> scoreEntityList = scoreRepository.findAllByHealthRoutineRecordIdOrderBySetNumAsc(scoreRequest.getHealthRoutineRecordId());

        //셋 정보가 없으면 루틴 정보도 삭제
        if(scoreEntityList.size() == 0){
            recordRepository.deleteById(scoreRequest.getHealthRoutineRecordId());
        }else{
            AtomicInteger setNum = new AtomicInteger(1);
            scoreEntityList.stream().forEach(scoreEntity -> {
                scoreEntity.setSetNum(setNum.getAndIncrement());
            });
            scoreRepository.saveAll(scoreEntityList);
        }





    }

    public void updateDone(RoutineRequest routineRequest) {

        scoreRepository.updateDoneFlag(routineRequest.getId(),routineRequest.getDoneFlag());

    }
}
