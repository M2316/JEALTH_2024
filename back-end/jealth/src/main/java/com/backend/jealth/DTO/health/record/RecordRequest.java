package com.backend.jealth.DTO.health.record;

import lombok.Data;

import java.util.List;

@Data
public class RecordRequest {

    private String id;
    private String routineId;
    private String name;
    private String workoutDate;
    private String imgCode;
    private String tagLevel1;
    private String tagLevel2;
    private String tagLevel3;
    private List<ScoreRequest> scoreList;

}
