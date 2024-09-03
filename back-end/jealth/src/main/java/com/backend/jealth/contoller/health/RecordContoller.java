package com.backend.jealth.contoller.health;

import com.backend.jealth.DTO.health.record.RecordRequest;
import com.backend.jealth.DTO.health.record.RecordResponse;
import com.backend.jealth.DTO.health.record.ScoreRequest;
import com.backend.jealth.DTO.health.routine.RoutineRequest;
import com.backend.jealth.service.health.RecordService;
import com.backend.jealth.util.AuthenticationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/health/record")
public class RecordContoller {

    private final AuthenticationUtil authenticationUtil;
    private final RecordService recordService;

    @GetMapping
    public List<RecordResponse> getRecordList(@RequestParam String workoutDateMonth){
        long userId = authenticationUtil.getUserId();

        return recordService.getRecordList(userId,workoutDateMonth);
    }


    @PutMapping
    public ResponseEntity<HttpStatus> appendRecord(@RequestBody List<RecordRequest> recordRequestList){
        long userId = authenticationUtil.getUserId();

        recordService.appendRecord(recordRequestList,userId);

        return new ResponseEntity<>(HttpStatus.OK);

    }

    @PostMapping("/done")
    public ResponseEntity<HttpStatus> updateDone(@RequestBody RoutineRequest routineRequest){

        recordService.updateDone(routineRequest);

        return new ResponseEntity<>(HttpStatus.OK);

    }

    @PutMapping("/score")
    public ResponseEntity<HttpStatus> appendScore(@RequestParam Long recordId){

        recordService.appendScore(recordId);

        return new ResponseEntity<>(HttpStatus.OK);

    }

    @PatchMapping("/score")
    public ResponseEntity<HttpStatus> updateScore(@RequestBody ScoreRequest scoreRequest){

        recordService.updateScore(scoreRequest);

        return new ResponseEntity<>(HttpStatus.OK);

    }

    @PatchMapping("/scoreDoneToggle")
    public ResponseEntity<HttpStatus> updateScoreDoneToggle(@RequestBody ScoreRequest scoreRequest){

        recordService.updateScoreDoneToggle(scoreRequest);

        return new ResponseEntity<>(HttpStatus.OK);

    }

    @DeleteMapping
    public ResponseEntity<HttpStatus> deleteRecord(@RequestBody ScoreRequest scoreRequest) {

        recordService.deleteRecord(scoreRequest);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
