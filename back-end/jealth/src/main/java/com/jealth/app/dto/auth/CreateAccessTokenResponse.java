package com.jealth.app.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class CreateAccessTokenResponse {
    private String accessToken;
}
