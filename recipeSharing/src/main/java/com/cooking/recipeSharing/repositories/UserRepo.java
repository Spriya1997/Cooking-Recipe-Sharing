package com.cooking.recipeSharing.repositories;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cooking.recipeSharing.model.UserEntity;

//  extending JpaRepository(built-in interface) gains access for performing CRUD operations & querying DB based on the entity type.
public interface UserRepo extends JpaRepository<UserEntity, Long>{
    // custom query methods
    Optional<UserEntity> findByPhoneNumber(String phoneNumber);
}
