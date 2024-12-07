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
        Optional<UserModel> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("Email is already registered!");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(UserModel.Role.user);
        user.setCreateDate(LocalDateTime.now());
        return userRepository.save(user);
    }

    // Sign-In Logic
    public UserModel signIn(String username, String password) {
        UserModel user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found!"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials!");
        }

        return user;
    }
}