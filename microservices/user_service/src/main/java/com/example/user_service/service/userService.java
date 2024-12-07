package com.example.user_service.service;

import com.example.user_service.module.UserModel;
import com.example.user_service.reposotory.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class userService {


    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Sign-Up Logic
    public UserModel signUp(String email, String username, String password) {
        if (userRepository.findByEmail(email) != null) {
            throw new IllegalArgumentException("Email is already registered!");
        } else if (userRepository.findByUsername(username) != null) {
            throw new IllegalArgumentException("Username is already registered!");
        }

        UserModel newUser = new UserModel();

        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setRole(UserModel.Role.user);
        newUser.setCreateDate(LocalDateTime.now());
        
        return userRepository.save(newUser);
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