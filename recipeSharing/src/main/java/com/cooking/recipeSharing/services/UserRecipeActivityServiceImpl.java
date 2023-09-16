package com.cooking.recipeSharing.services;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.cooking.recipeSharing.dtos.*;
import com.cooking.recipeSharing.model.*;
import com.cooking.recipeSharing.repositories.*;

@Service
@Transactional
public class UserRecipeActivityServiceImpl implements UserRecipeActivityService {

    @Autowired
    private RecipeRepo recipeRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private UserRecipeActivityRepo activityRepo;

    // private void verifyUserIdRecipeId(Long userId, Long recipeId){
    //     var user = userRepo.findById(userId);
    //     var recipe = recipeRepo.findById(recipeId);
    //     if(!user.isPresent() || !recipe.isPresent()){
    //         throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid userId or recipeId.");
    //     }
    // }

    @Override
    public UserRecipeActivityDto shouldSetFavoriteRecipe(Long userId, Long recipeId, boolean isFavorite) {
        var user = userRepo.findById(userId);
        var recipe = recipeRepo.findById(recipeId);
        if(!user.isPresent() || !recipe.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid userId or recipeId.");
        }
        var activity = activityRepo.findByUserAndRecipe(user.get(), recipe.get());
        UserRecipeActivityEntity activityEntity = null;
        if(activity.size() == 0)
        {
            activityEntity = new UserRecipeActivityEntity(user.get(), recipe.get(), isFavorite);
        }
        else
        {
            activityEntity = activity.get(0);
            activityEntity.setFavorite(isFavorite);
        }
        activityRepo.saveAndFlush(activityEntity);
        return new UserRecipeActivityDto(activityEntity);
    }


    @Override
    public UserRecipeActivityDto setReviews(Long userId, Long recipeId, UserRecipeActivityDto reviews) {
        var user = userRepo.findById(userId);
        var recipe = recipeRepo.findById(recipeId);
        if(!user.isPresent() || !recipe.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid userId or recipeId.");
        }
        
        var activity = activityRepo.findByUserAndRecipe(user.get(), recipe.get());
        UserRecipeActivityEntity activityEntity = null;
        if(activity.size() == 0)
        {
            activityEntity = new UserRecipeActivityEntity(user.get(), recipe.get(), reviews);
        }
        else
        {
            activityEntity = activity.get(0);
            activityEntity.SetActivity(reviews);
        }
        activityRepo.saveAndFlush(activityEntity);
        return new UserRecipeActivityDto(activityEntity);
    }


    @Override
    public UserRecipeActivityDto getAllActivitiesOfUsersRecipe(Long userId, Long recipeId,
            Long activityId) {
        var user = userRepo.findById(userId);
        var recipe = recipeRepo.findById(recipeId);
        var activity = activityRepo.findById(activityId);

        if(!user.isPresent() || !recipe.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid userId or recipeId.");
        }
        else if(!activity.isPresent()){
             return null;
        }
        Optional<UserRecipeActivityEntity> act = activity;
        return new UserRecipeActivityDto(act.get());

    }


    @Override
    public UserRecipeActivityDto editUserRecipeReview(Long activityId, UserRecipeActivityDto reviews) {
        var activity = activityRepo.findById(activityId);

        if(!activity.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid activity Id.");
        }
        var activityDetails = activity.get();
        activityDetails.SetActivity(reviews);
        activityRepo.saveAndFlush(activityDetails);
        return new UserRecipeActivityDto(activityDetails);
    }
    
}
