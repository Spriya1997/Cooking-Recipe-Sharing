package com.cooking.recipeSharing.dtos;


import java.io.Serializable;
import java.time.LocalDateTime;
import com.cooking.recipeSharing.model.RecipeEntity;
import com.cooking.recipeSharing.repositories.RecipeRepo.PublicRecipeDTO;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class RecipeDto implements Serializable {
    private Long id;
    private String name;
    private byte[] image; // Base64 encoded image as a string
    private String ingredients;
    private String instructions;
    private String servingSize;
    private Long cookingTime;
    private String difficultyLevel;
    private String cuisines;
    private String dietaryPreferences;
    private String mealType;
    private String additionalNotes;
    private RecipeVisibility visibility;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String imageBase64String;
    private boolean isFavorite;

    private UserActivity UserActivity;

    // to prevent null pointer exceptions doing "Sanity checking"
    public RecipeDto(RecipeEntity recipe) {
        if(recipe.getRecipeId() != null){
            this.id = recipe.getRecipeId();
        } 
        if (recipe.getRecipeName() != null) {
            this.name = recipe.getRecipeName();
        }
        if(recipe.getRecipeImage() != null){
             this.image = recipe.getRecipeImage();
        }
        if (recipe.getIngredients() != null) {
            this.ingredients = recipe.getIngredients();
        }
        if (recipe.getInstructions() != null) {
            this.instructions = recipe.getInstructions();
        }
        if (recipe.getServingSize() != null) {
            this.servingSize = recipe.getServingSize();
        }
        if (recipe.getCookingTime() != null) {
            this.cookingTime = recipe.getCookingTime();
        }
        if (recipe.getDifficultyLevel() != null) {
            this.difficultyLevel = recipe.getDifficultyLevel();
        }
        if (recipe.getCuisines() != null) {
            this.cuisines = recipe.getCuisines();
        }
        if (recipe.getDietaryPreferences() != null) {
            this.dietaryPreferences = recipe.getDietaryPreferences();
        }
        if (recipe.getMealType() != null) {
            this.mealType = recipe.getMealType();
        }
        if (recipe.getAdditionalNotes() != null) {
            this.additionalNotes = recipe.getAdditionalNotes();
        }
        if(recipe.getVisibility() != null){
            this.visibility = recipe.getVisibility();
        }
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public RecipeDto(RecipeEntity recipe, boolean isFavorite, UserActivity userActivity) {
        if(recipe.getRecipeId() != null){
            this.id = recipe.getRecipeId();
        } 
        if (recipe.getRecipeName() != null) {
            this.name = recipe.getRecipeName();
        }
        if(recipe.getRecipeImage() != null){
             this.image = recipe.getRecipeImage();
        }
        if (recipe.getIngredients() != null) {
            this.ingredients = recipe.getIngredients();
        }
        if (recipe.getInstructions() != null) {
            this.instructions = recipe.getInstructions();
        }
        if (recipe.getServingSize() != null) {
            this.servingSize = recipe.getServingSize();
        }
        if (recipe.getCookingTime() != null) {
            this.cookingTime = recipe.getCookingTime();
        }
        if (recipe.getDifficultyLevel() != null) {
            this.difficultyLevel = recipe.getDifficultyLevel();
        }
        if (recipe.getCuisines() != null) {
            this.cuisines = recipe.getCuisines();
        }
        if (recipe.getDietaryPreferences() != null) {
            this.dietaryPreferences = recipe.getDietaryPreferences();
        }
        if (recipe.getMealType() != null) {
            this.mealType = recipe.getMealType();
        }
        if (recipe.getAdditionalNotes() != null) {
            this.additionalNotes = recipe.getAdditionalNotes();
        }
        if(recipe.getVisibility() != null){
            this.visibility = recipe.getVisibility();
        }
        //this.createdAt = LocalDateTime.now();
        //this.updatedAt = LocalDateTime.now();
        this.isFavorite = isFavorite;
        this.UserActivity = userActivity;
    }


    // public RecipeDto(RecipeEntity recipeEntity, boolean isFavorite)
    // {
    //     var recipeDto = new RecipeDto(recipeEntity);
    //     recipeDto.isFavorite = isFavorite;
    // }

    public RecipeDto(PublicRecipeDTO publicRecipeDTO)
    {
        if(publicRecipeDTO.getRecipeId() != null){
            this.id = publicRecipeDTO.getRecipeId();
        } 
        if (publicRecipeDTO.getRecipeName() != null) {
            this.name = publicRecipeDTO.getRecipeName();
        }
        if(publicRecipeDTO.getRecipeImage() != null){
             this.image = publicRecipeDTO.getRecipeImage();
        }
        if (publicRecipeDTO.getIngredients() != null) {
            this.ingredients = publicRecipeDTO.getIngredients();
        }
        if (publicRecipeDTO.getInstructions() != null) {
            this.instructions = publicRecipeDTO.getInstructions();
        }
        if (publicRecipeDTO.getServingSize() != null) {
            this.servingSize = publicRecipeDTO.getServingSize();
        }
        if (publicRecipeDTO.getCookingTime() != null) {
            this.cookingTime = publicRecipeDTO.getCookingTime();
        }
        if (publicRecipeDTO.getDifficultyLevel() != null) {
            this.difficultyLevel = publicRecipeDTO.getDifficultyLevel();
        }
        if (publicRecipeDTO.getCuisines() != null) {
            this.cuisines = publicRecipeDTO.getCuisines();
        }
        if (publicRecipeDTO.getDietaryPreferences() != null) {
            this.dietaryPreferences = publicRecipeDTO.getDietaryPreferences();
        }
        if (publicRecipeDTO.getMealType() != null) {
            this.mealType = publicRecipeDTO.getMealType();
        }
        if (publicRecipeDTO.getRecipeNotes() != null) {
            this.additionalNotes = publicRecipeDTO.getRecipeNotes();
        }
        if(publicRecipeDTO.getVisibility() != null){
            this.visibility = publicRecipeDTO.getVisibility();
        }
        this.isFavorite = publicRecipeDTO.getIsFavorite() == null ? false : publicRecipeDTO.getIsFavorite();
        
        long favoritesCount = publicRecipeDTO.getFavoritesCount() != null ? publicRecipeDTO.getFavoritesCount().longValue() : 0;
        long commentsCount = publicRecipeDTO.getCommentsCount() != null ? publicRecipeDTO.getCommentsCount().longValue() : 0;
        double avgRatings = publicRecipeDTO.getAverageRatings() != null ? publicRecipeDTO.getAverageRatings() : 0.0;
        this.UserActivity = new UserActivity(favoritesCount, commentsCount, avgRatings);
    }

}
