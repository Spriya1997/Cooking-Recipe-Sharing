package com.cooking.recipeSharing.dtos;

import java.io.Serializable;
import java.time.LocalDateTime;
import com.cooking.recipeSharing.model.RecipeEntity;

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
}
