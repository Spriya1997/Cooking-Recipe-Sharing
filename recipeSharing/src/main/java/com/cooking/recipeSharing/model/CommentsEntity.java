package com.cooking.recipeSharing.model;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "Comments")

public class CommentsEntity {

   @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    // User can have many comments
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonBackReference
    @JoinColumn(name = "userId")
    private UserEntity user;

    // Recipe can have many comments
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonBackReference
    @JoinColumn(name = "recipeId")
    private RecipeEntity recipe;

    @Column(name = "Comments")
    private String message;

    private LocalDateTime messageTime;

    @Column(name = "UpdatedTime")
    private LocalDateTime updatedMessageTime;
}
