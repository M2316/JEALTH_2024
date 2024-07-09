package com.jealth.app.dto.user;

import lombok.Data;

@Data
public class AddUserRequest {
    private String email;
    private String password;
    private String nickname;
}
