package com.backend.jealth.DTO.health.record;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecordResponse {
    private long id;
    private String name;
    private String workoutDate;
    private String imgCode;
    private String tagLevel1;
    private String tagLevel2;
    private String tagLevel3;
    private List<ScoreResponse> scoreList;
}
