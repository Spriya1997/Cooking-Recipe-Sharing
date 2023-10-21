package com.cooking.recipeSharing.controllers;


import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.cooking.recipeSharing.dtos.*;
import com.cooking.recipeSharing.services.*;


@RestController
@RequestMapping("api/users/{userId}/notifications")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @GetMapping("getNotifications")
    public List<NotificationDto> getNotifications(@PathVariable Long userId) {
        return notificationService.getNotifications(userId);
    }

    @PostMapping("{notificationId}/notifySeen")
    public void UpdateNotificationSeen(@PathVariable long notificationId)
    {
        notificationService.updateSeenStatus(notificationId);
    }

}
