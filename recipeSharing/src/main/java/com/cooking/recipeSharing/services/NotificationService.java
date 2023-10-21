package com.cooking.recipeSharing.services;


import java.util.*;
import com.cooking.recipeSharing.dtos.NotificationDto;


public interface NotificationService {
    List<NotificationDto> getNotifications(Long userId);
    void updateSeenStatus(long notificationId);
}
