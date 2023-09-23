package com.cooking.recipeSharing.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.cooking.recipeSharing.dtos.*;
import com.cooking.recipeSharing.services.*;

@RestController
@RequestMapping("api/users/{userId}/recipes/{recipeId}")
public class UserRecipeController {

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private UserRecipeActivityService userRecipeActivityService;

    
    @PutMapping
    public RecipeDto updateRecipeById(@RequestBody RecipeDto recipeDetails, @PathVariable Long recipeId) {
        return recipeService.updateRecipeById(recipeDetails, recipeId);
    }

    @PostMapping("setFavorite/{isFavorite}")
    public UserRecipeActivityDto shouldSetFavoriteRecipe(@PathVariable Long userId, @PathVariable Long recipeId,
            @PathVariable boolean isFavorite) {
        return userRecipeActivityService.shouldSetFavoriteRecipe(userId, recipeId, isFavorite);
    }

    @PostMapping("setReviews")
    public UserRecipeActivityDto setReviews(@PathVariable Long userId, @PathVariable Long recipeId,
            @RequestBody UserRecipeActivityDto activity) {
        return userRecipeActivityService.setReviews(userId, recipeId, activity);
    }
     // get activity details of particular user by recipe id 
    @GetMapping("getActivities")
    public UserRecipeActivityDto getAllActivitiesOfUsersRecipe(@PathVariable Long userId, @PathVariable Long recipeId) {
        return userRecipeActivityService.getAllActivitiesOfUsersRecipe(userId, recipeId);
    }

}
