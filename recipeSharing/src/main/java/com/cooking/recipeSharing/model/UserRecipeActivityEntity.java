package com.cooking.recipeSharing.model;


import org.springframework.data.annotation.Id;

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
    private boolean favorites;

    @Column
    private int ratings;

}
