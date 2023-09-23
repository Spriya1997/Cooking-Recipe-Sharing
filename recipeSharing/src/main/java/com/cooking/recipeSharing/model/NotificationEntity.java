package com.cooking.recipeSharing.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;


import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;


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

    @Column
    private String comments;

    private LocalDateTime createdTimestamp;
}
