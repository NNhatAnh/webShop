package com.example.user_service.reposotory;

import com.example.user_service.module.UserModel;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface userRepo extends JpaRepository<UserModel, Integer> {
    Optional<UserModel> findByUsername(String username);
    Optional<UserModel> findByEmail(String email);
    // boolean existsByUsername(String username);
    // boolean existsByEmail(String email);
}
