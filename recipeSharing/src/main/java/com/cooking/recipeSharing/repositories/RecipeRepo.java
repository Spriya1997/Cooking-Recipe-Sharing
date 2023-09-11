package com.cooking.recipeSharing.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import com.cooking.recipeSharing.dtos.RecipeVisibility;
import com.cooking.recipeSharing.model.*;
import java.util.List;


//  extending JpaRepository(built-in interface) gains access for performing CRUD operations & querying DB based on the entity type.
public interface RecipeRepo extends JpaRepository<RecipeEntity, Long>{
    // custom query methods
    List<RecipeEntity> findAllByUserEquals(UserEntity user);
   // List<RecipeEntity> findByRecipeName(String recipeName);
   // List<RecipeEntity> findByMealType(String mealType);
   // List<RecipeEntity> findByCuisines(String cuisines);
    List<RecipeEntity> findByVisibility(RecipeVisibility visibility);
   // Optional<RecipeEntity> findByDifficultyLevel(String difficultyLevel);
    
}

