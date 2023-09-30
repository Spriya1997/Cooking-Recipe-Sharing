package com.cooking.recipeSharing.services;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.cooking.recipeSharing.dtos.*;
import com.cooking.recipeSharing.model.NotificationEntity;
import com.cooking.recipeSharing.repositories.*;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private NotificationRepo notifyRepo;

    @Override
    public List<NotificationDto> getNotifications(Long userId) {
        var user = userRepo.findById(userId);
        if (!user.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid user Id");
        }

        var notifications = notifyRepo.findByNotifyUser(user.get());
        var notificationDtos = notifications.stream().map(notificationEntity -> {
            var recipe = notificationEntity.getRecipe();
            var recipeId = recipe.getRecipeId();
            var recipeName = recipe.getRecipeName();
            var activityUser = notificationEntity.getActivityUser();
            var name = activityUser.getFirstName() + " " + activityUser.getLastName();

            return new NotificationDto(notificationEntity.getNotificationId(),recipeId, recipeName, name, notificationEntity.getRatings(),
                    notificationEntity.getComments(), notificationEntity.getIsFavorite(),
                    notificationEntity.getIsSeen(), notificationEntity.getCreatedTimestamp());
        }).collect(Collectors.toList());

        // notifyRepo.deleteAllById(notifications.stream().map(n ->
        // n.getNotificationId()).toList());

        return notificationDtos;
    }

    public void setNotificaton(NotificationEntity notificationEntity)
    {
        notifyRepo.saveAndFlush(notificationEntity);
    }

}
