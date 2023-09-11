package com.cooking.recipeSharing.dtos;

import org.springframework.web.multipart.MultipartFile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecipeMultipartData {
    public MultipartFile image;
    public RecipeDto data;
}
