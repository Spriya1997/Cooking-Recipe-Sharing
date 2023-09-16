package com.cooking.recipeSharing.services;

import com.cooking.recipeSharing.dtos.UserRecipeActivityDto;

public interface UserRecipeActivityService {
    UserRecipeActivityDto shouldSetFavoriteRecipe(Long userId,  Long recipeId, boolean isFavorite);
    UserRecipeActivityDto setReviews(Long userId,  Long recipeId, UserRecipeActivityDto activity);
    UserRecipeActivityDto getAllActivitiesOfUsersRecipe(Long userId,  Long recipeId, Long activityId);
    UserRecipeActivityDto editUserRecipeReview(Long activityId, UserRecipeActivityDto activity);
    
}
