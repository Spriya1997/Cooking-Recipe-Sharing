package com.cooking.recipeSharing.dtos;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class TwillioOtpRequestDto {
    @Value("${twillio.otp.account.sid}")
    public String accountSid;
    
    @Value("${twillio.otp.auth.token}")
    public String authToken;

    @Value("${twillio.otp.body.prefix}")
    public String body;

    @Value("${twillio.otp.from.phonenumber}")
    public String from;

    public String to;

    public void setTo(String phoneString, long otp)
    {
        to = "+1" + phoneString;
        body = body + " " + otp;
    }
}
