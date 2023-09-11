package com.cooking.recipeSharing.dtos;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginDto {
    private String phoneNumber;
    private String password;
}
