package com.jealth.app.service.user;

import com.jealth.app.domain.user.User;
import com.jealth.app.dto.user.AddUserRequest;
import com.jealth.app.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public Long save(AddUserRequest dto){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return userRepository.save(User.builder()
                .email(dto.getEmail())
                .password(encoder.encode(dto.getPassword()))
                .nickname(dto.getNickname())
                .build()).getId();
    }

    public User findById(Long userId){
        return userRepository.findById(userId)
                .orElseThrow(()-> new IllegalArgumentException("Unexpected User"));
    }

    public User findByEmail(String email){
        return userRepository.findByEmail(email)
                .orElseThrow(()-> new IllegalArgumentException("Unexpected User"));
    }
}
