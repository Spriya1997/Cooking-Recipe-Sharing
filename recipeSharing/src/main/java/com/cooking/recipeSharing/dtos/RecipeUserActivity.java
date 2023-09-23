package com.cooking.recipeSharing.dtos;

import java.time.LocalDateTime;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RecipeUserActivity {
    public String comment;
    public int ratings;
    public String userName;
    public LocalDateTime updatedTime;
}
