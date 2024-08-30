package com.backend.jealth.contoller.user;

import com.backend.jealth.DTO.user.FindingPasswordRequest;
import com.backend.jealth.DTO.user.UserDTO;
import com.backend.jealth.service.user.UserService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    @PostMapping("/api/v1/signup")
    public ResponseEntity<HttpStatus> signup(@RequestBody UserDTO userDTO) {
        userDTO.setName(userDTO.getNickname());
        UUID uuid = UUID.randomUUID();
        userDTO.setUserKey(uuid.toString());
        userService.save(userDTO); // 회원 가입 메서드 호출
        return ResponseEntity.ok().build(); // 회원 가입이 완료된 이후에 로그인 페이지로 이동
    }

    @PostMapping("/api/v1/emailAuthCodeSend")
    public ResponseEntity<HttpStatus> emailAuthCodeSend(@RequestBody FindingPasswordRequest request) throws MessagingException, UnsupportedEncodingException {
        userService.emailAuthCodeSend(request.getEmail());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/api/v1/autoCodeCheck")
    public ResponseEntity<HttpStatus> autoCodeCheck(@RequestBody FindingPasswordRequest request) {

        userService.autoCodeCheck(request.getEmail(), request.getAuthCode());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/api/v1/passwordChange")
    public ResponseEntity<HttpStatus> findingPassword(@RequestBody FindingPasswordRequest request) {
        userService.updatePassword(request.getEmail(), request.getPassword(), request.getAuthCode());

        return ResponseEntity.ok().build();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
