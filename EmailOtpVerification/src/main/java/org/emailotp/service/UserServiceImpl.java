package org.emailotp.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.emailotp.model.Users;
import org.emailotp.repository.UsersRepository;
import org.emailotp.requests.LoginRequest;
import org.emailotp.requests.RegisterRequest;
import org.emailotp.responses.LoginResponse;
import org.emailotp.responses.RegisterResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService{



    private final UsersRepository usersRepository;

    private final EmailService emailService;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private final static String OTP_KEY = "OTP";

    private static final long OTP_EXPIRATION_MINUTES = 5;

    @Override
    public RegisterResponse register(RegisterRequest registerRequest) {
        Users existingUser = usersRepository.findByEmail(registerRequest.getEmail());
        log.info("Existing user: {}", existingUser);
        if (existingUser != null) {
            throw new RuntimeException("User already exists");
        }

        Users users = Users.builder().userName(registerRequest.getUserName()).email(registerRequest.getEmail()).password(registerRequest.getPassword()).build();

        String otp = generateOTP();

        usersRepository.save(users);

        sendVerificationEmail(users.getEmail(), otp);
        RegisterResponse response = RegisterResponse.builder().userName(users.getUserName()).email(users.getEmail()).build();
        return response;
    }

    @Override
    public void verifyEmail(String email, String otp) {
        Users users = usersRepository.findByEmail(email);
        String storedOtp = (String) redisTemplate.opsForValue().get(OTP_KEY);
        if (users == null) {
            throw new RuntimeException("User not found");
        } else if (users.isVerified()) {
            throw new RuntimeException("User already verified");
        }
        else if (storedOtp!=null && storedOtp.equals(otp)) {
            users.setVerified(true);
            usersRepository.save(users);
            redisTemplate.delete(OTP_KEY);
        }
        else{
            throw new RuntimeException("Invalid OTP");
        }

    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        Users user = usersRepository.findByEmail(loginRequest.getEmail());
        Users loggedInUser = null;

       if (user != null && user.isVerified() && user.getPassword().equals(loginRequest.getPassword())) {
           loggedInUser = Users.builder().userName(user.getUserName()).email(user.getEmail()).build();
           log.info("Logged in user: {}", loggedInUser);
           log.info("username {}", loggedInUser.getUserName());
              log.info("email {}", loggedInUser.getEmail());

        }else {
           throw new RuntimeException("Invalid Credentials");
       }
       LoginResponse response = LoginResponse.builder().email(loginRequest.getEmail()).build();
       return response;
    }

    private String generateOTP() {
        Random random = new Random();
        int otpValue = 100000 + random.nextInt(900000);
        String otpString = String.valueOf(otpValue);
        redisTemplate.opsForValue().set(OTP_KEY, otpString, OTP_EXPIRATION_MINUTES, TimeUnit.MINUTES);
        return String.valueOf(otpValue);
    }

    private void sendVerificationEmail(String email, String otp) {
        String subject = "Email Verification";
        String text = "Your OTP is: " + otp;
        emailService.sendEmail(email, subject, text);
    }
}
