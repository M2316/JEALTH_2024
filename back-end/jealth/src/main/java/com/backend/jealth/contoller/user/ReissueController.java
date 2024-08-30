package com.backend.jealth.contoller.user;

import com.backend.jealth.domain.user.RefreshEntity;
import com.backend.jealth.repository.user.RefreshRepository;
import com.backend.jealth.util.JWTUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;

@Controller
@ResponseBody
@RequiredArgsConstructor
public class ReissueController {

    private final JWTUtil jwtUtil;

    private final RefreshRepository refreshRepository;

    @PostMapping("/api/v1/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {

        //get refresh token
         String refresh = null;
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {

            if (cookie.getName().equals("refresh-token")) {
                //기존 쿠키에서 refresh-token 추출
                refresh = cookie.getValue();

                cookie.setMaxAge(0);
                response.addCookie(cookie);

                //기존 쿠키 삭제
//                Cookie dummyCookie = new Cookie("refresh-token", null);
//                dummyCookie.setMaxAge(0);
//                dummyCookie.setPath("/");
////                dummyCookie.setSecure(true);
////                dummyCookie.setHttpOnly(true);
//                dummyCookie.setDomain(cookie.getDomain());
//                response.addCookie(dummyCookie);



            }
        }

        if (refresh == null) {

            //response status code
            return new ResponseEntity<>("refresh token null", HttpStatus.BAD_REQUEST);
        }

        //expired check
        try {
            jwtUtil.isExpired(refresh);
        } catch (ExpiredJwtException e) {

            //response status code
            return new ResponseEntity<>("refresh token expired", HttpStatus.BAD_REQUEST);
        }

        // 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
        String category = jwtUtil.getCategory(refresh);

        if (!category.equals("refresh")) {

            //response status code
            return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
        }

        //DB에 저장되어 있는지 확인
        Boolean isExist = refreshRepository.existsByRefreshToken(refresh);
        if (!isExist) {

            //response body
            return new ResponseEntity<>("exists refresh token", HttpStatus.BAD_REQUEST);
        }

        String userKey = jwtUtil.getUserKey(refresh);
        String role = jwtUtil.getRole(refresh);

        //make new JWT
        String accessToken = jwtUtil.createJwt("access",userKey, role, 60*10*1000L);
        String refreshToken = jwtUtil.createJwt("refresh",userKey, role, 60*10*1000L);

        //Refresh 토큰 저장 DB에 기존의 Refresh 토큰 삭제 후 새 Refresh 토큰 저장
        refreshRepository.deleteByRefreshToken(refresh);
        addRefreshEntity(userKey, refreshToken, 60*10*1000L);

        //response
        response.setHeader("access-token", accessToken);
        response.addCookie(createCookie("refresh-token", refreshToken));
        response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
        response.setHeader("Pragma", "no-cache");
        response.setDateHeader("Expires", 0);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    private void addRefreshEntity(String userKey, String refreshToken, long expiredMs){
        Date date = new Date(System.currentTimeMillis() + expiredMs);

        RefreshEntity refreshEntity = new RefreshEntity();
        refreshEntity.setUserKey(userKey);
        refreshEntity.setRefreshToken(refreshToken);
        refreshEntity.setExpiration(date.toString());

        refreshRepository.save(refreshEntity);

    }
    private Cookie createCookie(String key, String value){
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24*60*60);
        //https 적용시 secure true로 변경
//        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        return cookie;
    }
}
