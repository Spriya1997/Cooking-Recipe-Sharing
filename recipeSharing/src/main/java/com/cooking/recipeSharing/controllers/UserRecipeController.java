package com.cooking.recipeSharing.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.cooking.recipeSharing.dtos.*;
import com.cooking.recipeSharing.services.*;

@RestController
@RequestMapping("api/users")
public class UserRecipeController {

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private UserRecipeActivityService userRecipeActivityService;

    @GetMapping("/recipes/{recipeId}")
    public RecipeDto GetRecipe(@PathVariable Long recipeId){
        return recipeService.getRecipeById(recipeId);
    }

    @PostMapping("/{userId}/recipes/{recipeId}/setFavorite/{isFavorite}")
    public UserRecipeActivityDto ShouldSetFavoriteRecipe(@PathVariable Long userId, @PathVariable Long recipeId, @PathVariable boolean isFavorite){
        return userRecipeActivityService.shouldSetFavoriteRecipe(userId,recipeId, isFavorite);
    }

    @PostMapping("/{userId}/recipes/{recipeId}/setReviews")
    public UserRecipeActivityDto SetReviews(@PathVariable Long userId, @PathVariable Long recipeId, @RequestBody UserRecipeActivityDto activity){
        return userRecipeActivityService.setReviews(userId,recipeId, activity);
    }

    @GetMapping("/{userId}/recipes/{recipeId}/getActivities/{activityId}")
    public UserRecipeActivityDto GetAllActivitiesOfUsersRecipe(@PathVariable Long userId, @PathVariable Long recipeId, @PathVariable Long activityId){
        return userRecipeActivityService.getAllActivitiesOfUsersRecipe(userId, recipeId, activityId);
    }

    @PutMapping("editReviews/{activityId}")
    public UserRecipeActivityDto EditUserRecipeReview(@PathVariable Long activityId, @RequestBody UserRecipeActivityDto activity){
        return userRecipeActivityService.editUserRecipeReview(activityId, activity);
    }
}
