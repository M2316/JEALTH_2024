package com.backend.jealth.DTO.user;

import java.util.Map;

public class FacebookResponse implements OAuth2Response{


    private final Map<String, Object> attributes;

    public FacebookResponse(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public String getProvider() {
        return "facebook";
    }

    @Override
    public String getProviderId() {
        return this.attributes.get("id").toString();
    }

    @Override
    public String getEmail() {
        return this.attributes.get("email").toString();
    }

    @Override
    public String getName() {
        return this.attributes.get("name").toString();
    }
    public String getNickname(){
        return this.attributes.get("name").toString();
    }
}
