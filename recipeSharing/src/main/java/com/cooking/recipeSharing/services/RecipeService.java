package com.cooking.recipeSharing.services;

import java.util.*;

import org.springframework.web.bind.annotation.PathVariable;

import com.cooking.recipeSharing.dtos.RecipeDto;
import com.cooking.recipeSharing.dtos.RecipeUserActivity;

public interface RecipeService {
     void createNewRecipe(RecipeDto recipeDto, Long userId); 
     List<RecipeDto> getAllRecipesByUserId(Long userId);
     RecipeDto getRecipeById(Long recipeId);
     void deleteRecipeById(Long recipeId);
     RecipeDto updateRecipeById(RecipeDto recipeDto, Long recipeId);

     List<RecipeUserActivity>getRecipeUserActivity(Long recipeId);
     
     List<RecipeDto> getAllPublicPostRecipes(long userId);
     List<RecipeDto> getUserFavoriteRecipes(@PathVariable Long userId);
}
