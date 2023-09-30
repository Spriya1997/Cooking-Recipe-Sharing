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
    @Autowired
    private NotificationServiceImpl notificationServiceImpl;

    private void verifyUserIdRecipeId(Long userId, Long recipeId){
        var user = userRepo.findById(userId);
        var recipe = recipeRepo.findById(recipeId);
        if(!user.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid userId");
        }
        if(!recipe.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid recipeId");
        }
    }

    @Override
    public UserRecipeActivityDto shouldSetFavoriteRecipe(Long userId, Long recipeId, boolean isFavorite) {
        verifyUserIdRecipeId(userId, recipeId);
        var activity = new UserRecipeActivityDto(isFavorite, null, null, null, null);
        upsertUserActivity(userId, recipeId, activity);
        return activity;
    }

    //insert & update reviews
    @Override
    public UserRecipeActivityDto setReviews(Long userId, Long recipeId, UserRecipeActivityDto reviews) {
        verifyUserIdRecipeId(userId, recipeId);
        upsertUserActivity(userId, recipeId, reviews);
        return reviews;
    }
    
    // get activity details of particular user by recipe id 
    @Override
    public UserRecipeActivityDto getAllActivitiesOfUsersRecipe(Long userId, Long recipeId) {
        var user = userRepo.findById(userId);
        var recipe = recipeRepo.findById(recipeId);
        var activity = activityRepo.findByUserAndRecipe(user.get(),recipe.get());

        verifyUserIdRecipeId(userId, recipeId);
        
        if (activity.isEmpty()) {
            return null;
        }
        List<UserRecipeActivityEntity> act = activity;
        return new UserRecipeActivityDto(act.get(0));

    }

    // @Override
    // public UserRecipeActivityDto editUserRecipeReview(Long activityId, UserRecipeActivityDto reviews) {
    //     var activity = activityRepo.findById(activityId);

    //     if (!activity.isPresent()) {
    //         throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid activity Id.");
    //     }
    //     var activityDetails = activity.get();
    //     activityDetails.SetActivity(reviews);
    //     activityRepo.saveAndFlush(activityDetails);
    //     return new UserRecipeActivityDto(activityDetails);
    // }

    private void upsertUserActivity(Long userId, Long recipeId, UserRecipeActivityDto userRecipeActivityDto)
    {
        var user = userRepo.findById(userId);
        var recipe = recipeRepo.findById(recipeId);
        verifyUserIdRecipeId(userId, recipeId);
        
        var activity = activityRepo.findByUserAndRecipe(user.get(), recipe.get());
        UserRecipeActivityEntity activityEntity = null;
        if (activity.size() == 0) {
            activityEntity = new UserRecipeActivityEntity(user.get(), recipe.get(), userRecipeActivityDto);
        } else {
            activityEntity = activity.get(0);
            if(userRecipeActivityDto.getIsFavorite() != null)
            {
                activityEntity.setIsFavorite(userRecipeActivityDto.getIsFavorite());
            }
            if(userRecipeActivityDto.getRatings() != null)
            {
                activityEntity.setRatings(userRecipeActivityDto.getRatings());
            }
            if(userRecipeActivityDto.getComments() != null)
            {
                activityEntity.setComments(userRecipeActivityDto.getComments());
            }
        }

        activityRepo.saveAndFlush(activityEntity);
        notificationServiceImpl.setNotificaton(new NotificationEntity(user.get(), recipe.get(), userRecipeActivityDto));
    }
}
