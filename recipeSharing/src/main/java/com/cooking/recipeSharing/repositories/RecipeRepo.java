package com.cooking.recipeSharing.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cooking.recipeSharing.dtos.RecipeVisibility;
import com.cooking.recipeSharing.model.*;
import java.time.LocalDateTime;
import java.util.*;

//  extending JpaRepository(built-in interface) gains access for performing CRUD operations & querying DB based on the entity type.
public interface RecipeRepo extends JpaRepository<RecipeEntity, Long> {
        // custom query methods
        List<RecipeEntity> findAllByUserEquals(UserEntity user);
        List<RecipeEntity> findByVisibility(RecipeVisibility visibility);
        List<RecipeEntity> findByRecipeName(String recipeName);
        
        @Query(value = "Select rd.*,ua.* from\r\n" + //
                        "(Select r.recipe_id as recipeId, r.recipe_notes as recipeNotes, \r\n" + //
                        " r.cooking_time as cookingTime, r.created_at as createdAt, r.cuisines as cuisines, \r\n" + //
                        " r.dietary_preferences as dietaryPreferences, r.difficulty_level as difficultyLevel, r.ingredients as ingredients, \r\n" + //
                        " r.instructions, r.meal_type as mealType, r.recipe_image as recipeImage, r.recipe_name as recipeName, \r\n" + //
                        " r.serving_size as servingSize, r.updated_at as updatedAt, r.user_id as userId, ua.is_favorite as isFavorite \r\n" + //
                        "from recipes r left join (Select * from user_recipe_activity where user_id=1) ua\r\n" + //
                        "on r.recipe_id = ua.recipe_id\r\n" + //
                        "where visibility = 'Public') rd left join\r\n" + //
                        "(Select recipe_id, count(is_favorite) as favoritesCount, count(comments) as commentsCount, avg(ratings) as averageRatings\r\n" + //
                        "from user_recipe_activity\r\n" + //
                        "group by recipe_id) ua on  ua.recipe_id = rd.recipeId\r\n" + //
                        "order by updatedat desc\r\n" + //
                        "\r\n" + //
                        "", nativeQuery = true)
        List<PublicRecipeDTO> getPublicRecipesByUserId(Long userId);

//     @Modifying
//     @Query("DELETE FROM user_recipe_activity ura WHERE ura.recipe_id = :recipeId")
//     void deleteActivityByRecipe(@Param("recipeId") Long recipeId);

//     @Modifying
//     @Query("DELETE FROM notification n WHERE n.recipe_id = :recipeId")
//     void deleteNotificationByRecipe(@Param("recipeId") Long recipeId);

//     @Modifying
//     @Query("DELETE FROM recipes WHERE recipe_id = :recipeId")
//     void deleteRecipe(@Param("recipeId") Long recipeId);

//     default void deleteRecipeAndRelatedData(Long recipeId) {
//         deleteActivityByRecipe(recipeId);
//         deleteNotificationByRecipe(recipeId);
//         deleteRecipe(recipeId);
//     }



        public interface PublicRecipeDTO {
        Long getRecipeId();
        String getRecipeName();
        byte[] getRecipeImage();
        String getIngredients();
        String getInstructions();
        String getServingSize();
        Long getCookingTime();
        String getDifficultyLevel();
        String getCuisines();
        String getDietaryPreferences();
        String getMealType();
        String getAdditionalNotes();
        String getRecipeNotes();
        RecipeVisibility getVisibility();
        LocalDateTime getCreatedAt();
        LocalDateTime getUpdatedAt();
        Boolean getIsFavorite();
        Integer getFavoritesCount();
        Integer getCommentsCount();
        Double getAverageRatings();
        }

        // @NoArgsConstructor
        // @AllArgsConstructor
        // @Data
        // public class PublicRecipeEntity {
        // private Long recipeId;
        // private String recipeName;
        // @Lob
        // private byte[] recipeImage;
        // private String ingredients; 
        // private String instructions;
        // private String servingSize;
        // private Long cookingTime;
        // private String difficultyLevel;
        // private String cuisines;
        // private String dietaryPreferences;
        // private String mealType;
        // @Column(name = "RecipeNotes")
        // private String additionalNotes;
        // @Enumerated(value = EnumType.STRING)
        // private RecipeVisibility visibility; // public or private
        // private LocalDateTime createdAt;
        // private LocalDateTime updatedAt;
        // Boolean isFavorite;
        // Integer FavoritesCount;
        // Integer CommentsCount;
        // Double AverageRatings;
        // }
}