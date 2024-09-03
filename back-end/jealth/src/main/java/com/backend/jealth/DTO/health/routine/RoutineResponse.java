package com.backend.jealth.DTO.health.routine;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoutineResponse {
    private String id;
    private String name;
    private String imgCode;
    private String tagLevel1;
    private String tagLevel2;
    private String tagLevel3;
}
