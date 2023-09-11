package com.cooking.recipeSharing.controllers;

import java.io.IOException;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.cooking.recipeSharing.dtos.*;
import com.cooking.recipeSharing.services.*;

@RestController
@RequestMapping("api/users/{userId}/recipes")

public class RecipeController {
    
    @Autowired
    private RecipeService recipeService;

    @PostMapping
    public void addRecipe(@RequestBody RecipeDto recipeDto, @PathVariable Long userId) throws IOException{
        recipeDto.setImage(Base64.getDecoder().decode(recipeDto.getImageBase64String()));
        recipeService.createNewRecipe(recipeDto, userId);
    }

    @GetMapping
    public List<RecipeDto> ListUserRecipes(@PathVariable Long userId){
        return recipeService.getAllRecipesByUserId(userId);
    }

    @DeleteMapping("{recipeId}")
    public void deleteRecipeByRecipeId(@PathVariable Long recipeId){
        recipeService.deleteRecipeById(recipeId);
    }

    @PutMapping("{recipeId}")
    public RecipeDto updateRecipeById(@RequestBody RecipeDto recipeDetails, @PathVariable Long recipeId){
        return recipeService.updateRecipeById(recipeDetails,recipeId);
    }

}
