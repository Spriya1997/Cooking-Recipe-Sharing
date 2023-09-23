package com.cooking.recipeSharing.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UserActivity {
    private long favoritesCount;
    private long commentsCount;
    private double averageRating;
}
