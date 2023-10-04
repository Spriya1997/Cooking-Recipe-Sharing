package com.cooking.recipeSharing.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cooking.recipeSharing.dtos.RecipeVisibility;
import com.cooking.recipeSharing.model.*;
import java.util.*;

//  extending JpaRepository(built-in interface) gains access for performing CRUD operations & querying DB based on the entity type.
public interface RecipeRepo extends JpaRepository<RecipeEntity, Long> {
        // custom query methods
        List<RecipeEntity> findAllByUserEquals(UserEntity user);
        List<RecipeEntity> findByVisibility(RecipeVisibility visibility);

        // List<RecipeEntity> findByRecipeName(String recipeName);
        
        // @Query(value = "Select rd.*,ua.* from\r\n" + //
        // "(Select recipe_id, count(is_favorite) as favoritesCount, count(comments) as
        // commentsCount, avg(ratings) as averageRatings\r\n" + //
        // "from user_recipe_activity\r\n" + //
        // "group by recipe_id) ua\r\n" + //
        // "inner join\r\n" + //
        // "(Select r.recipe_id as recipeId, r.recipe_notes as recipeNotes, \r\n" + //
        // " r.cooking_time as cookingTime, r.created_at as createdAt, r.cuisines as
        // cuisines, \r\n" + //
        // " r.dietary_preferences as dietaryPreferences, r.difficulty_level as
        // difficultyLevel, r.ingredients as ingredients, \r\n" + //
        // " r.instructions, r.meal_type as mealType, r.recipe_image as recipeImage,
        // r.recipe_name as recipeName, \r\n" + //
        // " r.serving_size as servingSize, r.updated_at as updatedAt, r.user_id as
        // userId, r.visibility as visibility, ua.is_favorite as isFavorite\r\n" + //
        // "from recipes r inner join user_recipe_activity ua\r\n" + //
        // "on r.recipe_id = ua.recipe_id\r\n" + //
        // "where visibility = 'Public' and ua.user_id=?1) rd on ua.recipe_id =
        // rd.recipeId\r\n", nativeQuery = true);

        // List<PublicRecipeDTO> getPublicRecipesByUserId(Long userId);

        // public interface PublicRecipeDTO {
        // Long getRecipeId();
        // String getRecipeName();
        // byte[] getRecipeImage();
        // //TypedQuery<byte[]> getRecipeImage(); // Base64 encoded image as a string
        // String getIngredients();
        // String getInstructions();
        // String getServingSize();
        // Long getCookingTime();
        // String getDifficultyLevel();
        // String getCuisines();
        // String getDietaryPreferences();
        // String getMealType();
        // String getAdditionalNotes();
        // String getRecipeNotes();
        // RecipeVisibility getVisibility();
        // LocalDateTime getCreatedAt();
        // LocalDateTime getUpdatedAt();
        // Boolean getIsFavorite();
        // Integer getFavoritesCount();
        // Integer getCommentsCount();
        // Double getAverageRatings();
        // }

}