package com.cooking.recipeSharing.dtos;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class OtpRequestDto {
    @Value("${sinch.otp.from.phonenumber}")
    public String from;
    
    @Value("${sinch.otp.body.prefix}")
    public String body;

    public String[] to;

    private boolean otpRegistered = false;

    public void setTo(String phoneString, long otp)
    {
        if(otpRegistered){
            body = body.substring(0, body.length()-6) ;
        }

        to = new String[] {"1" + phoneString};
        body = body + " " + otp;
        otpRegistered = true;
    }
}
