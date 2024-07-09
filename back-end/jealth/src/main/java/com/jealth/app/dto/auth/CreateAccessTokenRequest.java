package com.jealth.app.dto.auth;


import lombok.Data;

@Data
public class CreateAccessTokenRequest {
    private String refreshToken;
    private String email;
    private String password;
}
