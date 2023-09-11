package com.cooking.recipeSharing.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import com.cooking.recipeSharing.dtos.*;
import com.cooking.recipeSharing.services.*;

@RestController
@RequestMapping("api/users")
public class UserRecipeController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping("/recipes")
    public List<RecipeDto> getAllPublicPostRecipes(){
        return recipeService.getAllPublicPostRecipes();
    }

    @GetMapping("/recipes/{recipeId}")
    public RecipeDto GetRecipe(@PathVariable Long recipeId){
        return recipeService.getRecipeById(recipeId);
    }
}
