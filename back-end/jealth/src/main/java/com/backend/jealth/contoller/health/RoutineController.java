package com.backend.jealth.contoller.health;

import com.backend.jealth.DTO.health.routine.RoutineRequest;
import com.backend.jealth.DTO.health.routine.RoutineResponse;
import com.backend.jealth.service.health.RoutineService;
import com.backend.jealth.util.AuthenticationUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/health/routine")
public class RoutineController {


    private final AuthenticationUtil authenticationUtil;

    private final RoutineService routineService;

    @GetMapping
    public List<RoutineResponse> getRoutineList(HttpServletRequest request) {

        long userId = authenticationUtil.getUserId();

        return routineService.getRoutineList(userId);
    }

    @PatchMapping
    public ResponseEntity<HttpStatus> updateRoutine(@RequestBody RoutineRequest routineRequest) {

        long userId = authenticationUtil.getUserId();
        routineRequest.setAppUserId(userId);

        routineService.updateRoutine(routineRequest);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<HttpStatus> deleteRoutine(@RequestBody RoutineRequest routineRequest) {

        long userId = authenticationUtil.getUserId();
        routineRequest.setAppUserId(userId);

        routineService.deleteRoutine(routineRequest);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
