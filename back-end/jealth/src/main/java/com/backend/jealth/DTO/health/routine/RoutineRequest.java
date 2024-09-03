package com.backend.jealth.DTO.health.routine;

import lombok.*;

import java.util.Date;
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoutineRequest {
    private String id;
    private long appUserId;
    private String name;
    private String imgCode;
    private String tagLevel1;
    private String tagLevel2;
    private String tagLevel3;
    private Boolean doneFlag;
    private Date createdDate;
    private Date updatedDate;
}
