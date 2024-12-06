package com.example.user_service.controller;

import com.example.user_service.module.UserModel;
import com.example.user_service.reposotory.userRepo;
import com.example.user_service.service.userService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/user")
public class userController {
    @Autowired
    private userRepo UserRepo;

    @Autowired
    private userService UserService;

    @GetMapping("/")
    public String home() {
        return "Web app sell watch";
    }

    // @GetMapping("/{username}")
    // public List<UserModel> getMethodName(@PathVariable String username) {
    //     List<UserModel> userDetail = UserRepo.findByUsername(username);
    //     return userDetail;
    // }

    @GetMapping("/listUser")
    public List<UserModel> getUserList() {
        return UserRepo.findAll();
    }

// Sign-Up Endpoint
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody UserModel user) {
        try {
            UserService.signUp(user);
            return new ResponseEntity<>("User registered successfully!", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Sign-In Endpoint
    @PostMapping("/signin")
    public ResponseEntity<String> signIn(@RequestParam String email, @RequestParam String password) {
        try {
            UserModel user = UserService.signIn(email, password);
            return new ResponseEntity<>("Welcome, " + user.getUsername() + "!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }
    
}
