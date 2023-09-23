package com.cooking.recipeSharing.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cooking.recipeSharing.dtos.UserRecipeActivityDto;
import com.cooking.recipeSharing.services.UserRecipeActivityService;


@RestController
@RequestMapping("api/users")
public class ActivityController {
    @Autowired
    private UserRecipeActivityService userRecipeActivityService;

    @PutMapping("editReviews/{activityId}")
    public UserRecipeActivityDto editUserRecipeReview(@PathVariable Long activityId,
            @RequestBody UserRecipeActivityDto activity) {
        return userRecipeActivityService.editUserRecipeReview(activityId, activity);
    }
}
