package com.cooking.recipeSharing.dtos;

import java.time.LocalDateTime;

import com.cooking.recipeSharing.model.UserEntity;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDto {
    private String firstname;
    private String lastname;
    private String country;
    private String city;
    private String phoneNumber;
    private Long id;
    private String bio;
    private LocalDateTime updatedTimestamp;

    public UserProfileDto(UserEntity userEntity)
    {
        this.id = userEntity.getUserId();
        this.firstname = userEntity.getFirstName();
        this.lastname = userEntity.getLastName();
        this.country = userEntity.getCountry();
        this.city = userEntity.getCity();
        this.bio = userEntity.getBio();
        this.phoneNumber = userEntity.getPhoneNumber();
        this.updatedTimestamp = LocalDateTime.now();
    }
}
