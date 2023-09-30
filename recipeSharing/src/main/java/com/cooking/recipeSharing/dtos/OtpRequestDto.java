package com.cooking.recipeSharing.dtos;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class OtpRequestDto {
    @Value("${sinch.otp.from.phonenumber}")
    public String from;
    
    @Value("${sinch.otp.body.prefix}")
    private String bodyPrefix;

    public String[] to;

    public String body;

    public void setTo(String phoneString, long otp)
    {
        to = new String[] {"1" + phoneString};
        body = bodyPrefix + " " + otp;
    }
}
