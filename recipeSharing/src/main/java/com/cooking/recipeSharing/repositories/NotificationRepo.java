package com.cooking.recipeSharing.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import com.cooking.recipeSharing.model.*;
import java.util.List;


public interface NotificationRepo extends JpaRepository<NotificationEntity, Long> {
    List<NotificationEntity> findByNotifyUser(UserEntity notifyUser);
    void deleteByRecipe(RecipeEntity recipeEntity);
}
