package com.cooking.recipeSharing.services;

import java.util.*;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.cooking.recipeSharing.dtos.*;
import com.cooking.recipeSharing.model.*;
import com.cooking.recipeSharing.repositories.*;


@Service
@Transactional
public class RecipeServiceImpl implements RecipeService {

    @Autowired
    private RecipeRepo recipeRepo;
    @Autowired
    private UserRepo userRepo;

    @Override
    public void createNewRecipe(RecipeDto recipeDto, Long userId) {
        Optional<UserEntity> userOptional = userRepo.findById(userId);
        RecipeEntity recipe = new RecipeEntity(recipeDto);
        userOptional.ifPresent(recipe::setUser);

        // // Convert and set the base64 encoded image
        // byte[] decodedImage = Base64.getDecoder().decode(recipeDto.getImage());
        // recipe.setRecipeImage(decodedImage);

        recipeRepo.saveAndFlush(recipe);

        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User ID not found : " + userId);
        }
    }

    @Override
    public List<RecipeDto> getAllRecipesByUserId(Long userId) {
        Optional<UserEntity> user = userRepo.findById(userId);
        if (user.isPresent()){
            List<RecipeEntity> recipeList = recipeRepo.findAllByUserEquals(user.get());
            return recipeList.stream().map(RecipeEntity -> new RecipeDto(RecipeEntity)).collect(Collectors.toList());
        }
        return Collections.emptyList(); 
    }

    @Override
    public RecipeDto getRecipeById(Long recipeId) {
        Optional<RecipeEntity> recipe = recipeRepo.findById(recipeId);
        return new RecipeDto(recipe.get());
    }

    @Override
    public void deleteRecipeById(Long recipeId){
        Optional<RecipeEntity> recipeDetails = recipeRepo.findById(recipeId);
        recipeDetails.ifPresent(recipe -> recipeRepo.delete(recipe));
    }

    @Override
    public RecipeDto updateRecipeById(RecipeDto recipeDto, Long recipeId) {
        var recipe = recipeRepo.findById(recipeId);
        if(recipe.isPresent()){
            var recipeDetails = recipe.get();
            recipeDetails.SetRecipeEntity(recipeDto);
            recipeRepo.saveAndFlush(recipeDetails);
            return new RecipeDto(recipeDetails);
        }
        return null;
    }

    @Override
    public List<RecipeDto> getAllPublicPostRecipes() {
         List<RecipeEntity> recipeList = recipeRepo.findByVisibility(RecipeVisibility.Public);
        if (!recipeList.isEmpty()){
            return recipeList.stream().map(RecipeEntity -> new RecipeDto(RecipeEntity)).collect(Collectors.toList());
        }
        return Collections.emptyList(); 
    }
}