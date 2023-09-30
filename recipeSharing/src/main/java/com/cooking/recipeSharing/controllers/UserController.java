package com.cooking.recipeSharing.controllers;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.cooking.recipeSharing.dtos.*;
import com.cooking.recipeSharing.services.*;

@RestController
@RequestMapping("api/users")

public class UserController {
    @Autowired
    private UserService userService;

    // @Autowired
    // private RecipeService recipeService;

    @PostMapping("signUp")
    public UserProfileDto register(@RequestBody UserDto userDetails){
        return userService.addNewUser(userDetails);
    }

    @PostMapping("login")
    public UserProfileDto userlogin(@RequestBody UserLoginDto userDetails){
        return userService.login(userDetails);
    }

    @GetMapping("{userId}")
    public UserProfileDto userProfile(@PathVariable Long userId) throws IOException{
        return userService.getUserProfileById(userId);
    }

    @PutMapping("{userId}")
    public UserProfileDto updateUserProfileById(@RequestBody UserProfileDto userDetails,@PathVariable Long userId){
        userDetails.setId(userId);
        return userService.updateUserProfileById(userDetails);
    }

    @PostMapping("phoneNumbers/{phoneNumber}/generateOTP")
    public void generateOTPByPhoneNumber(@PathVariable String phoneNumber){
        userService.generateOTPByPhoneNumber(phoneNumber);
        return;
    }

    @PostMapping("phoneNumbers/{phoneNumber}/{otp}/{password}")
    public UserDto validateOtpAndPwdByPhoneNumber(@PathVariable String phoneNumber, @PathVariable Long otp, @PathVariable String password){
        return userService.validateOtpAndPwdByPhoneNumber(phoneNumber, otp, password);
    }
    //Validate only OTP
    @PostMapping("phoneNumbers/{phoneNumber}/{otp}")
    public void validateOTP(@PathVariable String phoneNumber, @PathVariable Long otp){
        userService.validateOTP(phoneNumber, otp);
    }

    @DeleteMapping("{userId}")
    public void deleteUserAccount(@PathVariable Long userId){
        userService.deleteUserById(userId);
    }

}
