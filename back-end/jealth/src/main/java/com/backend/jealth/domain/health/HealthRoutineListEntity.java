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
@Table(name = "health_routine_list")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HealthRoutineListEntity {
//    @Id
//    private String id;
    @EmbeddedId
    @SequenceGenerator(name = "health_routine_id_seq", sequenceName = "health_routine_id_seq", allocationSize = 1)
    private HealthRoutineListId key;
    @Column(nullable = false)
    private long appUserId;

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

    public HealthRoutineListEntity(
            String id,
            long routineIdx,
            long appUserId,
            String name,
            String imgCode,
            String tagLevel1,
            String tagLevel2,
            String tagLevel3,
            Date createdDate,
            Date updatedDate
    ){
            this.key = new HealthRoutineListId(id, routineIdx);
            this.appUserId = appUserId;
            this.name = name;
            this.imgCode = imgCode;
            this.tagLevel1 = tagLevel1;
            this.tagLevel2 = tagLevel2;
            this.tagLevel3 = tagLevel3;
            this.createdDate = createdDate;
            this.updatedDate = updatedDate;
    }


    public void setId(String id){
        this.key.setId(id);
    }
    public String getId(){
        return this.key.getId();
    }
}
