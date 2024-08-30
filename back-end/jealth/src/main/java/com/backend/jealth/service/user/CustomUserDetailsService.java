package com.backend.jealth.service.user;

import com.backend.jealth.DTO.user.CustomUserDetails;
import com.backend.jealth.domain.user.UserEntity;
import com.backend.jealth.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String userKey) throws UsernameNotFoundException {
        UserEntity userInfo = userRepository.findByUserKey(userKey);

        if(userInfo != null){
            return new CustomUserDetails(userInfo);
        }

        return null;
    }
}
