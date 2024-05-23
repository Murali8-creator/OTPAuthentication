package org.emailotp.service;

import org.emailotp.model.Users;
import org.emailotp.requests.LoginRequest;
import org.emailotp.requests.RegisterRequest;
import org.emailotp.responses.LoginResponse;
import org.emailotp.responses.RegisterResponse;

public interface UserService {


    RegisterResponse register(RegisterRequest registerRequest);

    void verifyEmail(String email, String otp);

    LoginResponse login(LoginRequest loginRequest);
}
