package com.example.user_service.service;

import com.example.user_service.module.UserModel;
import com.example.user_service.reposotory.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class userService {


    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Sign-Up Logic
    public UserModel signUp(UserModel user) {
        // Check if email is already registered
        Optional<UserModel> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("Email is already registered!");
        }

        // Hash the password and set the creation date
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreateDate(LocalDateTime.now());
        return userRepository.save(user);
    }

    // Sign-In Logic
    public UserModel signIn(String email, String password) {
        // Find user by email
        UserModel user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found!"));

        // Verify password
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials!");
        }

        return user;
    }
}