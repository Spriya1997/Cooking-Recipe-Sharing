package com.cooking.recipeSharing.model;

import java.time.LocalDateTime;

import com.cooking.recipeSharing.dtos.UserRecipeActivityDto;
import com.fasterxml.jackson.annotation.JsonBackReference;


import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Notification")
public class NotificationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonBackReference
    @JoinColumn(name = "activityUserId")
    private UserEntity activityUser;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonBackReference
    @JoinColumn(name = "recipe_id")
    private RecipeEntity recipe;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonBackReference
    @JoinColumn(name = "notifyUserId")
    private UserEntity notifyUser;

    @Column
    private Boolean isFavorite;

    @Column
    private Integer ratings;

    @Column
    private String comments;

    @Column
    private Boolean isSeen;

    private LocalDateTime createdTimestamp;

    public NotificationEntity(UserEntity user, RecipeEntity recipe, UserRecipeActivityDto activity)
    {
        this.activityUser = user;
        this.recipe = recipe;
        this.notifyUser = recipe.getUser();
        this.isSeen = false;
        this.isFavorite = activity.getIsFavorite();
        this.ratings = activity.getRatings();
        this.comments = activity.getComments();
        this.createdTimestamp =  LocalDateTime.now();
    }
}
