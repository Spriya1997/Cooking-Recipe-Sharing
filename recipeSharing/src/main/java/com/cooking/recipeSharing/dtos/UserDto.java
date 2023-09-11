package com.cooking.recipeSharing.dtos;

import java.io.Serializable;
import java.time.LocalDateTime;
import lombok.*;
import com.cooking.recipeSharing.model.*;

@Data
@NoArgsConstructor
public class UserDto implements Serializable{
    private Long id;
    private String firstName;
    private String lastName;
    private String password;
    private Long otp;
    private LocalDateTime createdTimestamp;
    private String phoneNumber;

    // to prevent null pointer exceptions doing "Sanity checking"
    public UserDto(UserEntity user){
        if(user.getFirstName() != null){
            this.firstName = user.getFirstName();
        }
        if(user.getLastName() != null){
            this.lastName = user.getLastName();
        }
        if(user.getPassword() != null){
            this.password = user.getPassword();
        }
        if(user.getOtp() != null){
            this.otp = user.getOtp();
        }
        this.phoneNumber = user.getPhoneNumber();
        this.createdTimestamp = LocalDateTime.now();
    }
}
