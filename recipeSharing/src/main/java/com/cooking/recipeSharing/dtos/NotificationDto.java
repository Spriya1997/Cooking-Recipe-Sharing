package com.cooking.recipeSharing.dtos;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDto {

    private Long notificationId;
    private Long recipeId;
    private String recipeName;
    private String userFullName;
    private Integer ratings;
    private String comments;
    private Boolean isFavorite;
    private Boolean isSeen;
    private LocalDateTime createdTimestamp;

}
