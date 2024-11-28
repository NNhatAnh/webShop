package com.example.webshop_service.repository;

import com.example.webshop_service.module.UserModel;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<UserModel, Integer> {
    @Query("SELECT u from UserModel u where u.id = :userID")
    List<UserModel> user(@Param("userID") int userID);
}
