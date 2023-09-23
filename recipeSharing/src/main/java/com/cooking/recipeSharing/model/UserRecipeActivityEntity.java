package com.cooking.recipeSharing.model;

import java.time.LocalDateTime;

import com.cooking.recipeSharing.dtos.UserRecipeActivityDto;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "UserRecipeActivity", uniqueConstraints = { @UniqueConstraint(name = "UniqueUserAndRecipe", columnNames = { "userId", "recipeId" })})
@NoArgsConstructor
@AllArgsConstructor
public class UserRecipeActivityEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long activityId;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonBackReference
    @JoinColumn(name = "userId")
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonBackReference
    @JoinColumn(name = "recipeId")
    private RecipeEntity recipe;

    @Column
    private boolean isFavorite;

    @Column
    private int ratings;

    @Column(name = "Comments")
    private String comments;

    private LocalDateTime createdTimestamp;
    private LocalDateTime updatedTimestamp;

    public UserRecipeActivityEntity(UserEntity user, RecipeEntity recipe, boolean isFavorite)
    {
        this.setUser(user);
        this.setRecipe(recipe);
        this.isFavorite = isFavorite;
        this.createdTimestamp = LocalDateTime.now();
    }

    public UserRecipeActivityEntity(UserEntity user, RecipeEntity recipe, UserRecipeActivityDto activity)
    {
        this.setUser(user);
        this.setRecipe(recipe);
        this.setRatings(ratings);
        this.setComments(comments);
        this.updatedTimestamp = LocalDateTime.now();
    }

    public void SetActivity(UserRecipeActivityDto activity){
        // this.setUser(user);
        // this.setRecipe(recipe);
        this.setRatings(activity.getRatings());
        this.setComments(activity.getComments());
        this.updatedTimestamp = LocalDateTime.now();
    }
}
