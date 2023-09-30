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
    private Boolean isFavorite;

    @Column
    private Integer ratings;

    @Column(name = "Comments")
    private String comments;

    private LocalDateTime updatedTimestamp;

    public UserRecipeActivityEntity(UserEntity user, RecipeEntity recipe, UserRecipeActivityDto activity)
    {
        this.setUser(user);
        this.setRecipe(recipe);
        this.isFavorite = activity.getIsFavorite();
        this.comments = activity.getComments();
        this.ratings = activity.getRatings();
        this.updatedTimestamp = LocalDateTime.now();
    }
}
