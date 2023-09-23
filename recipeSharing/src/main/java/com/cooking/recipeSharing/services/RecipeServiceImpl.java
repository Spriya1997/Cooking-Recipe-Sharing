package com.cooking.recipeSharing.services;

import java.util.*;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.cooking.recipeSharing.dtos.*;
import com.cooking.recipeSharing.model.*;
import com.cooking.recipeSharing.repositories.*;

import lombok.var;

@Service
@Transactional
public class RecipeServiceImpl implements RecipeService {

    @Autowired
    private RecipeRepo recipeRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private UserRecipeActivityRepo activityRepo;

    @Override
    public void createNewRecipe(RecipeDto recipeDto, Long userId) {
        Optional<UserEntity> userOptional = userRepo.findById(userId);
        RecipeEntity recipe = new RecipeEntity(recipeDto);
        userOptional.ifPresent(recipe::setUser);
        recipeRepo.saveAndFlush(recipe);

        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User ID not found : " + userId);
        }
    }

    @Override
    public List<RecipeDto> getAllRecipesByUserId(Long userId) {
        Optional<UserEntity> user = userRepo.findById(userId);
        if (user.isPresent()) {
            List<RecipeEntity> recipeList = recipeRepo.findAllByUserEquals(user.get());
            return recipeList.stream().map(RecipeEntity -> new RecipeDto(RecipeEntity)).collect(Collectors.toList());
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid user Id");
    }

    @Override
    public RecipeDto getRecipeById(Long recipeId) {
        Optional<RecipeEntity> recipe = recipeRepo.findById(recipeId);
        if (!recipe.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid recipe Id");
        }
        UserActivity userActivity = getUserActivityByRecipe(recipe.get());
        // Add isFavorite
        return new RecipeDto(recipe.get(), false, userActivity);
    }

    @Override
    public void deleteRecipeById(Long recipeId) {
        Optional<RecipeEntity> recipeDetails = recipeRepo.findById(recipeId);
        recipeDetails.ifPresent(recipe -> recipeRepo.delete(recipe));
    }

    @Override
    public RecipeDto updateRecipeById(RecipeDto recipeDto, Long recipeId) {
        var recipe = recipeRepo.findById(recipeId);
        if (recipe.isPresent()) {
            var recipeDetails = recipe.get();
            recipeDetails.SetRecipeEntity(recipeDto);
            recipeRepo.saveAndFlush(recipeDetails);
            return new RecipeDto(recipeDetails);
        }
        return null;
    }

    @Override
    public List<RecipeDto> getAllPublicPostRecipes(long userId) {
        var user = userRepo.findById(userId);
        List<RecipeEntity> recipeList = recipeRepo.findByVisibility(RecipeVisibility.Public);
        var userFavoriteRecipe = activityRepo.findByUserAndIsFavorite(user.get(), true);
        var stream = userFavoriteRecipe.stream();
        var map = stream.map(activityList -> activityList.getRecipe().getRecipeId());
        var set = map.collect(Collectors.toSet());

        if (!recipeList.isEmpty()) {
            var result = recipeList.stream().map(
                    recipeEntity -> {
                        var isFavorite = set.contains(recipeEntity.getRecipeId());
                        return new RecipeDto(recipeEntity, isFavorite, getUserActivityByRecipe(recipeEntity));
                    }).collect(Collectors.toList());

            return result;
        }
        return Collections.emptyList();
    }

    private UserActivity getUserActivityByRecipe(RecipeEntity recipeEntity) {
        var activities = activityRepo.findByRecipe(recipeEntity);
        long favoritesCount = activities.stream().filter(activity -> activity.isFavorite()).count();
        long commentsCount = activities.stream().filter(activity -> activity.getComments() != null).count();
        double averageRating = activities.stream().mapToDouble(activity -> activity.getRatings()).average().orElse(0.0);

        return new UserActivity(favoritesCount, commentsCount, averageRating);
    }

    @Override
    public List<RecipeDto> getUserFavoriteRecipes(Long userId) {
        var user = userRepo.findById(userId);
        if (!user.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid user Id");
        }
        List<RecipeEntity> recipeList = recipeRepo.findByVisibility(RecipeVisibility.Public);
        var userFavoriteRecipe = activityRepo.findByUserAndIsFavorite(user.get(), true);
    
        // set of favorite recipe id's for user's favorite recipes
        Set<Long> favoriteRecipeIds = userFavoriteRecipe.stream()
                .map(favoriteList -> favoriteList.getRecipe().getRecipeId())
                .collect(Collectors.toSet());

        if (!recipeList.isEmpty()) {
            return recipeList.stream()
            .filter(recipeEntity -> favoriteRecipeIds.contains(recipeEntity.getRecipeId()))
            .map(recipeEntity -> {return new RecipeDto(recipeEntity, true, null);})
            .collect(Collectors.toList());
        }
        return Collections.emptyList();

    }

    @Override
    public List<RecipeUserActivity> getRecipeUserActivity(Long recipeId) {
        var recipe = recipeRepo.findById(recipeId);
        if (!recipe.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid recipe Id");
        }
        List<RecipeUserActivity> recipeUserActivities = 
                activityRepo.findByRecipe(recipe.get()).stream().map(
                    entity -> {
                        var userEntity = entity.getUser();
                        var fullName = userEntity.getFirstName() + " " + userEntity.getLastName();
                        return new RecipeUserActivity(entity.getComments(), entity.getRatings(), fullName,null);
                        
                    }).collect(Collectors.toList());

                return recipeUserActivities;
    }
}