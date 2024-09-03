package com.backend.jealth.DTO.health.record;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ScoreRequest {
    private String id;
    private long appUserId;
    private long healthRoutineRecordId;
    private int setNum;
    private int weight;
    private String weightUnit;
    private int count;
    private String countUnit;
    private Boolean setDoneFlag;

}
