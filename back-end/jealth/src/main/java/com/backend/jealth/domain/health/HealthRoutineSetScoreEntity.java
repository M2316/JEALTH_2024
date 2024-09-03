package com.backend.jealth.domain.health;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "health_routine_set_score")
public class HealthRoutineSetScoreEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private long appUserId;

    private long healthRoutineRecordId;

    @Column(nullable = false)
    private int setNum;

    @Column(nullable = false)
    private int weight;

    @Column(nullable = false)
    private String weightUnit;

    @Column(nullable = false)
    private int count;

    @Column(nullable = false)
    private String countUnit;

    private Boolean setDoneFlag;

    @CreationTimestamp
    private Date createdDate;
    @UpdateTimestamp
    private Date updatedDate;
}
