package com.cooking.recipeSharing.dtos;

import java.time.LocalDateTime;

import com.cooking.recipeSharing.model.UserRecipeActivityEntity;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRecipeActivityDto {
    
    private Boolean isFavorite;
    private Integer ratings;
    private String comments;
    private Long activityId;
    private LocalDateTime createdTimeStamp;

    public UserRecipeActivityDto(UserRecipeActivityEntity activity){
        this.activityId = activity.getActivityId();
        this.isFavorite = activity.getIsFavorite();
        this.ratings = activity.getRatings();
        this.comments = activity.getComments();
        this.createdTimeStamp = LocalDateTime.now();
    }
}
