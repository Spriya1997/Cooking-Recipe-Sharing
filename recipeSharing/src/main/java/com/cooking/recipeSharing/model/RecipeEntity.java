package com.cooking.recipeSharing.model;

import java.time.LocalDateTime;
import java.util.*;

import com.cooking.recipeSharing.dtos.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Recipes")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class RecipeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recipeId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonBackReference
    @JoinColumn(name = "userId")
    private UserEntity user;

    @OneToMany(mappedBy = "recipe",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<UserRecipeActivityEntity> userRecipeActivities = new HashSet<>();

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<NotificationEntity> notificationEntity = new HashSet<>();

    private byte[] recipeImage;

    @Column(nullable = false)
    private String recipeName;
   
    @Column(columnDefinition = "text")
    private String ingredients;

    @Column(nullable = false, columnDefinition = "text")
    private String instructions;

   // @Column(nullable = false)
    private String servingSize;

    @Column(length = 4)
    private Long cookingTime;
    private String difficultyLevel;
    private String cuisines;
    private String dietaryPreferences;

    @Column
    private String mealType;

    @Column(name = "RecipeNotes")
    private String additionalNotes;
    
    @Enumerated(value = EnumType.STRING)
    private RecipeVisibility visibility; // public or private

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    // private String reference; 
    // private String videos; 
    // private String tags;
    //private String faq;

    
    public RecipeEntity(RecipeDto recipe){
        if(recipe.getName() != null){
            this.recipeName = recipe.getName();
        }
        if(recipe.getImage() != null){
            this.recipeImage = recipe.getImage();
        }
        if(recipe.getIngredients() != null){
            this.ingredients = recipe.getIngredients();
        }
        if(recipe.getInstructions() != null){
            this.instructions = recipe.getInstructions();
        }
        if(recipe.getServingSize() != null){
            this.servingSize = recipe.getServingSize();
        }
        if(recipe.getCookingTime() != null){
            this.cookingTime = recipe.getCookingTime();
        }
        if(recipe.getDifficultyLevel() != null){
            this.difficultyLevel = recipe.getDifficultyLevel();
        }
        if(recipe.getCuisines() != null){
            this.cuisines = recipe.getCuisines();
        }
        if(recipe.getDietaryPreferences() != null){
            this.dietaryPreferences = recipe.getDietaryPreferences();
        }
        if(recipe.getVisibility() != null){
            this.visibility = recipe.getVisibility();
        }
        if(recipe.getMealType() != null){
            this.mealType = recipe.getMealType();
        }
        if(recipe.getAdditionalNotes() != null){
            this.additionalNotes = recipe.getAdditionalNotes();
        }
        
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    public void SetRecipeEntity(RecipeDto recipeDto)
    {
        this.setRecipeName(recipeDto.getName());
        this.setIngredients(recipeDto.getIngredients());
        this.setInstructions(recipeDto.getInstructions());
        this.setAdditionalNotes(recipeDto.getAdditionalNotes());
        this.setCookingTime(recipeDto.getCookingTime());
        this.setCuisines(recipeDto.getCuisines());
        this.setDietaryPreferences(recipeDto.getDietaryPreferences());
        this.setDifficultyLevel(recipeDto.getDifficultyLevel());
        this.setVisibility(recipeDto.getVisibility());
        this.setMealType(recipeDto.getMealType());
        this.setServingSize(recipeDto.getServingSize());
    }
}
