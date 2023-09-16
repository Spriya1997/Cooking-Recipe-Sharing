package com.cooking.recipeSharing.services;

import java.util.*;
import com.cooking.recipeSharing.dtos.RecipeDto;

public interface RecipeService {
     void createNewRecipe(RecipeDto recipeDto, Long userId); 
     List<RecipeDto> getAllRecipesByUserId(Long userId);
     RecipeDto getRecipeById(Long recipeId);
     void deleteRecipeById(Long recipeId);
     RecipeDto updateRecipeById(RecipeDto recipeDto, Long recipeId);

     List<RecipeDto> getAllPublicPostRecipes(long userId);
}
