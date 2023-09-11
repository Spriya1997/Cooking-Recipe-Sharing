package com.cooking.recipeSharing.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cooking.recipeSharing.model.UserRecipeActivityEntity;

public interface UserRecipeActivityRepo extends JpaRepository<UserRecipeActivityEntity, Long> {
    List<UserRecipeActivityEntity> findByFavorites(boolean favorites);
}
