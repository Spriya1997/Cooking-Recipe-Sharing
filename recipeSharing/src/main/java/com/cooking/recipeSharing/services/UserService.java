package com.cooking.recipeSharing.services;

import com.cooking.recipeSharing.dtos.*;
import org.springframework.transaction.annotation.Transactional;


public interface UserService {
    @Transactional
    UserProfileDto addNewUser(UserDto newUserRegisterDto);
    UserProfileDto login(UserLoginDto loginDto);

    UserProfileDto getUserProfileById(Long userId);
    UserProfileDto updateUserProfileById(UserProfileDto userProfileDto);
    void deleteUserById(Long userId);

    void generateOTPByPhoneNumber(String phoneNumber);
    UserDto validateOtpAndPwdByPhoneNumber(String phoneNumber, Long otp, String password);
    void validateOTP(String phoneNumber, Long otp);

    
}
