package com.cooking.recipeSharing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class RecipeSharingApplication {

	public static void main(String[] args) {
		SpringApplication.run(RecipeSharingApplication.class, args);
		System.out.println("Hello world!!!");
	}

	@Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")  // Adjust the mapping as needed.
                        .allowedOrigins("http://localhost:3000")  // Allow requests from your React app
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowCredentials(true);
            }
        };
    }

}
