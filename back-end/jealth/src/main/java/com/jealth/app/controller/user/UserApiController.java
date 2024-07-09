package com.jealth.app.controller.user;

import com.jealth.app.domain.user.User;
import com.jealth.app.dto.user.AddUserRequest;
import com.jealth.app.dto.auth.CreateAccessTokenRequest;
import com.jealth.app.dto.auth.CreateAccessTokenResponse;
import com.jealth.app.service.auth.TokenService;
import com.jealth.app.service.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RequiredArgsConstructor
@RestController
public class UserApiController {


    private final UserService userService;
    private final TokenService tokenService;

    @PostMapping("/api/v1/signup")
    public ResponseEntity<HttpStatus> signup(@RequestBody AddUserRequest request){
        userService.save(request); // 회원 가입 메서드 호출
        return ResponseEntity.ok().build(); // 회원 가입이 완료된 이후에 로그인 페이지로 이동
    }

    @PostMapping("/api/v1/login")
    public ResponseEntity<CreateAccessTokenResponse> createNewAccessToeken(@RequestBody CreateAccessTokenRequest createAccessTokenRequest, HttpServletRequest request, HttpServletResponse response, Authentication authentication){
        //로그인 요청 처리
        String newTokens = tokenService.login(createAccessTokenRequest, request, response);

        return ResponseEntity.status(HttpStatus.CREATED)
                .header("Authorization",newTokens)
                .build();
    }

    @GetMapping("/api/v1/logout")
    public ModelAndView logout(HttpServletRequest request, HttpServletResponse response,ModelAndView modelAndView){
        new SecurityContextLogoutHandler().logout(request,response, SecurityContextHolder.getContext().getAuthentication());
        modelAndView.setViewName("redirect:/login");
        return modelAndView;
    }



}
