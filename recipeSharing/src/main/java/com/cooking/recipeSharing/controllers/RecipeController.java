package com.cooking.recipeSharing.controllers;

import java.io.IOException;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.cooking.recipeSharing.dtos.*;
import com.cooking.recipeSharing.services.*;

@RestController
@RequestMapping("api/users")

public class RecipeController {
    
    @Autowired
    private RecipeService recipeService;

    @PostMapping("{userId}/recipes")
    public void addRecipe(@RequestBody RecipeDto recipeDto, @PathVariable Long userId) throws IOException{
        recipeDto.setImage(Base64.getDecoder().decode(recipeDto.getImageBase64String()));
        recipeService.createNewRecipe(recipeDto, userId);
    }

    @GetMapping("{userId}/recipes")
    public List<RecipeDto> listAllUserRecipes(@PathVariable Long userId){
        return recipeService.getAllRecipesByUserId(userId);
    }

    @GetMapping("{userId}/recipes/listPublicRecipes")
    public List<RecipeDto> getAllPublicPostRecipes(@PathVariable long userId){
        return recipeService.getAllPublicPostRecipes(userId);
    }

    @GetMapping("recipes/{recipeId}")
    public RecipeDto getRecipe(@PathVariable Long recipeId) {
        //@RequestParam boolean shouldGetUserActivities
        return recipeService.getRecipeById(recipeId);
    }

    @GetMapping("{userId}/userFavoriteRecipes")
    public List<RecipeDto> getUserFavoriteRecipes(@PathVariable Long userId){
        return recipeService.getUserFavoriteRecipes(userId);
    }

    @DeleteMapping("recipes/{recipeId}")
    public void deleteRecipeById(@PathVariable Long recipeId) {
        recipeService.deleteRecipeById(recipeId);
    }

    // Fetching all reviews of recipe by recipeId
    @GetMapping("recipes/{recipeId}/reviews")
    public List<RecipeUserActivity> getRecipeUserActivity(@PathVariable Long recipeId) {
        return recipeService.getRecipeUserActivity(recipeId);
    }

}
