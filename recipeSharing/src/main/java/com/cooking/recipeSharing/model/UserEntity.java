package com.cooking.recipeSharing.model;

import java.time.LocalDateTime;
import java.util.*;

import com.cooking.recipeSharing.dtos.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "Users")
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<RecipeEntity> recipeSet = new HashSet<>();
    
    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column(nullable=false)
    private String password;

    @Column
    private String country;

    @Column
    private String city;

    @Column(nullable=false, unique = true)
    private String phoneNumber;

    @Column
    private String bio;

    @Column
    private Long otp;

    private LocalDateTime createdTimestamp;
    private LocalDateTime updatedTimestamp;
    private LocalDateTime lastOtpTimestamp;

    public UserEntity(UserDto user){
        // if(user.getUserId() != null){
        //     this.id = user.getUserId();
        // }    // no need since id's are auto generated..
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

    public UserEntity(UserProfileDto user){
        if(user.getFirstname() != null){
            this.firstName = user.getFirstname();
        }
        if(user.getLastname() != null){
            this.lastName = user.getLastname();
        }
        if(user.getCity() != null){
            this.city = user.getCity();
        }
        if(user.getCountry()!= null){
            this.country = user.getCountry();
        }
        if(user.getPhoneNumber()!=null){
            this.phoneNumber = user.getPhoneNumber();
        }
        if(user.getBio() != null){
            this.phoneNumber = user.getBio();
        }
        this.updatedTimestamp = LocalDateTime.now();
    }

    public void setOtp(long otp)
    {
        this.otp = otp;
        this.lastOtpTimestamp = LocalDateTime.now();
    }

    public void updatePassword(String password)
    {
        this.password = password;
        this.updatedTimestamp = LocalDateTime.now();
    }

    public void SetUserEntity(UserProfileDto userDetails)
    {
        this.setFirstName(userDetails.getFirstname());
        this.setLastName(userDetails.getLastname());
        this.setCity(userDetails.getCity());
        this.setCountry(userDetails.getCountry());
        this.setBio(userDetails.getBio());
        this.setPhoneNumber(userDetails.getPhoneNumber());
        this.updatedTimestamp = LocalDateTime.now();
    }
}
