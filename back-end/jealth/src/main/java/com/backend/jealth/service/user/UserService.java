package com.backend.jealth.service.user;

import com.backend.jealth.DTO.user.UserDTO;
import com.backend.jealth.domain.user.EmailAuthCodeEntity;
import com.backend.jealth.domain.user.UserEntity;
import com.backend.jealth.repository.user.EmailAuthCodeRepository;
import com.backend.jealth.repository.user.UserRepository;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Random;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final EmailAuthCodeRepository emailAuthCodeRepository;
    private final JavaMailSender javaMailSender;

    public Long save(UserDTO dto){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return userRepository.save(UserEntity.builder()
                .email(dto.getEmail())
                .name(dto.getName())
                .userKey(dto.getUserKey())
                .password(encoder.encode(dto.getPassword()))
                .nickname(dto.getNickname())
                .build()).getId();
    }

    public UserEntity findById(Long userId){
        return userRepository.findById(userId)
                .orElseThrow(()-> new IllegalArgumentException("Unexpected User"));
    }

    public UserEntity findByEmail(String email){
        return userRepository.findByEmail(email)
                .orElseThrow(()-> new IllegalArgumentException("Unexpected User"));
    }

    public void emailAuthCodeSend(String email) throws MessagingException {

        // 이메일이 존재하는지 확인
        if(!userRepository.existsByEmail(email)){
            throw new IllegalArgumentException("Unexpected User");
        }

        // 이메일로 보낼 인증코드 생성
        String authCode = createKey();

        // 전송 전에 DB에 authCode 저장
        EmailAuthCodeEntity emailAuthCodeEntity = EmailAuthCodeEntity.builder()
                .email(email)
                .authCode(authCode)
                .build();
        emailAuthCodeRepository.save(emailAuthCodeEntity);


        // 발송될 이메일 본문 작성
        MimeMessage message = javaMailSender.createMimeMessage();

        message.addRecipients(Message.RecipientType.TO, email); // 메일 받을 사용자
        message.setSubject("[JEALTH] 비밀번호 변경을 위한 이메일 인증코드 입니다"); // 이메일 제목

        String msgg = "";
        msgg += "<h1>안녕하세요 JEALTH 회원님.</h1>";
        msgg += "<br>";
        msgg += "<p>아래 인증코드를 암호변경 페이지에 입력해주세요</p>";
        msgg += "<br>";
        msgg += "<br>";
        msgg += "<div align='center' style='border:1px solid black'>";
        msgg += "<h3 style='color:blue'>이메일 인증코드 입니다</h3>";
        msgg += "<div style='font-size:130%'>";
        msgg += "<strong>" + authCode + "</strong></div><br/>" ; // 메일에 인증번호 ePw 넣기
        msgg += "</div>";
        // msgg += "<img src=../resources/static/image/emailfooter.jpg />"; // footer image

        message.setText(msgg, "utf-8", "html"); // 메일 내용, charset타입, subtype
        // 보내는 사람의 이메일 주소, 보내는 사람 이름
//        message.setFrom(new InternetAddress("jealth.app@gmail.com", "JEALTH"));
//        System.out.println("********creatMessage 함수에서 생성된 msgg 메시지********" + msgg);

//        System.out.println("********creatMessage 함수에서 생성된 리턴 메시지********" + message);
        try { // 예외처리
            javaMailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
            throw new IllegalArgumentException("이메일 발송에 실패했습니다. 다시 시도해주세요.");
        }

    }

    public void autoCodeCheck(String email, String authCode) {
        // 이메일이 존재하는지 확인
        if(!userRepository.existsByEmail(email)){
            throw new IllegalArgumentException("등록된 이메일을 찾을 수 없습니다.");
        }

        // DB에 저장된 인증코드 가져오기
        EmailAuthCodeEntity authCodeEntity = emailAuthCodeRepository.findFirstByEmailOrderByCreatedDateDesc(email);


        // 인증코드가 일치하는지 확인
        if(!authCode.equals(authCodeEntity.getAuthCode())){
            throw new IllegalArgumentException("인증코드가 일치하지 않습니다.");
        }


    }





    // 랜덤 인증코드 생성
    public String createKey() {
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 10;
        Random random = new Random();
        String key = random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
        return key;
    }

    public void updatePassword(String email, String password, String authCode) {

        // 이메일이 존재하는지 확인
        if(!userRepository.existsByEmail(email)){
            throw new IllegalArgumentException("등록된 이메일을 찾을 수 없습니다.");
        }

        // DB에 저장된 인증코드 가져오기
        EmailAuthCodeEntity authCodeEntity = emailAuthCodeRepository.findFirstByEmailOrderByCreatedDateDesc(email);

        // 인증코드가 일치하는지 확인
        if(!authCode.equals(authCodeEntity.getAuthCode())){
            throw new IllegalArgumentException("인증코드가 일치하지 않습니다.");
        }

        // 비밀번호 암호화
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode(password);

        // 비밀번호 변경
        UserEntity userEntity = userRepository.findByEmail(email).get();
        userEntity.setPassword(encodedPassword);
        userRepository.save(userEntity);


    }
}
