package com.jealth.app.controller.home;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/home")
public class HomeApiContoller {

    @PostMapping
    public String HomeList(HttpServletRequest request, HttpServletRequest response){

        return "HomeList";
    }
}
