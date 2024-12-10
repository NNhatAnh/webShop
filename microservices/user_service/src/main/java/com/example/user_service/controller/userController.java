package com.example.user_service.controller;

import com.example.user_service.config.JwtUtil;
import com.example.user_service.module.UserModel;
import com.example.user_service.reposotory.UserRepository;
import com.example.user_service.service.userService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/user")
public class userController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private userService userService;

    // Get list users
    @GetMapping("/listUser")
    public List<UserModel> listUser() {
        List<UserModel> user = userRepository.findAll();
        return user;
    }

    // User information
    @GetMapping("/{username:[a-zA-Z]+}")
    public Optional<UserModel> userDetial(@PathVariable String username) {
        Optional<UserModel> user = userRepository.findByUsername(username);
        return user;
    }

    // API to check user
    @GetMapping("{userID:\\d+}")
    public List<UserModel> checkUser(@PathVariable int userID) {
        List<UserModel> user = userRepository.findByID(userID);
        return user;
    }

    // Sign-Up
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody Map<String, String> body) {
        try {
            String email = body.get("email");
            String username = body.get("username");
            String password = body.get("password");

            userService.signUp(email, username, password);

            return new ResponseEntity<>("User registered successfully!", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Sign-In
    @PostMapping("/signin")
    public ResponseEntity<String> signIn(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        UserModel user = userService.signIn(username, password);

        JwtUtil jwtUtil = new JwtUtil();
        String token = jwtUtil.generateToken(user);

        return ResponseEntity.ok(token);
    }

}
