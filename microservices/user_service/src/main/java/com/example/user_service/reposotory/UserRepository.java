package com.example.user_service.reposotory;

import com.example.user_service.module.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Integer> {
    Optional<UserModel> findByEmail(String email);
    Optional<UserModel> findByUsername(String username);
    List<UserModel> findByID(int iD);

    @Query("Select id, username, email, phone, address from UserModel u where u.id = :userID")
    List<UserModel> userData(@Param("userID") int userID);
}
