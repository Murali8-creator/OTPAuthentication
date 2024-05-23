package org.emailotp.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.emailotp.requests.LoginRequest;
import org.emailotp.requests.OTPRequest;
import org.emailotp.requests.RegisterRequest;
import org.emailotp.responses.HomeResponse;
import org.emailotp.responses.LoginResponse;
import org.emailotp.responses.RegisterResponse;
import org.emailotp.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final UserService userService;


    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest registerRequest){
        log.info("Register Request: {}", registerRequest);
        log.info("Register Request email: {}", registerRequest.getEmail());
        RegisterResponse response = userService.register(registerRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody OTPRequest otpRequest){
        log.info("OTP Request: {}", otpRequest.getEmail());
        userService.verifyEmail(otpRequest.getEmail(), otpRequest.getOtp());
        return new ResponseEntity<>("User Verified Successfully",HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        log.info("Login Request: {}", loginRequest.getEmail());
        LoginResponse response = userService.login(loginRequest);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/home")
    public ResponseEntity<?> home(){
        HomeResponse response = HomeResponse.builder().message("Welcome to Home Page").build();
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
