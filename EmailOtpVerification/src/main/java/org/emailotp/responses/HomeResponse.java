package org.emailotp.responses;


import lombok.Builder;

@Builder
public class HomeResponse {
    private String message;

    public HomeResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
