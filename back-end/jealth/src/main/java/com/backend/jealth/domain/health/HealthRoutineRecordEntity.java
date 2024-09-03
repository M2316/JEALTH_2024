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
@Table(name = "health_routine_record")
public class HealthRoutineRecordEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private long appUserId;

    @Column(nullable = false)
    private String routineId;

    @Column(nullable = false)
    private String workoutDate;

    @Column(nullable = false)
    private String name;

    private String imgCode;

    @Column(nullable = false)
    private String tagLevel1;

    @Column(nullable = false)
    private String tagLevel2;

    @Column(nullable = false)
    private String tagLevel3;

    @CreationTimestamp
    private Date createdDate;

    @UpdateTimestamp
    private Date updatedDate;

}
