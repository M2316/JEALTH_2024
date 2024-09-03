package com.backend.jealth.domain.health;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.*;

import java.io.Serializable;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Data
@Builder
public class HealthRoutineListId implements Serializable {

    @Column(name = "id")
    private String id;
    @Column(name = "routine_idx")
    private long routineIdx;
}
