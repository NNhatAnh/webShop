package com.example.user_service.controller;

import com.example.user_service.module.UserModel;
import com.example.user_service.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/users")
public class userController {

    @Autowired
    private userService userService;

    // Sign-Up Endpoint
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody UserModel user) {
        try {
            userService.signUp(user);
            return new ResponseEntity<>("User registered successfully!", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Sign-In Endpoint
    @PostMapping("/signin")
    public ResponseEntity<String> signIn(@RequestParam String email, @RequestParam String password) {
        try {
            UserModel user = userService.signIn(email, password);
            return new ResponseEntity<>("Welcome, " + user.getUsername() + "!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }
}
