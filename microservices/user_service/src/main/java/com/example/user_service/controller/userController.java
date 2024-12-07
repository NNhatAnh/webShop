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

    @GetMapping("/listUser")
    public List<UserModel> listUser() {
        List<UserModel> user = userRepository.findAll();
        return user;
    }

    @GetMapping("{username}")
    public Optional<UserModel> userDetial(@PathVariable String username) {
        Optional<UserModel> user = userRepository.findByUsername(username);
        return user;
    }

    public String getMethodName(@RequestParam String param) {
        return new String();
    }

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
    public ResponseEntity<String> signIn(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        UserModel user = userService.signIn(username, password);

        JwtUtil jwtUtil = new JwtUtil();
        String token = jwtUtil.generateToken(user);

        return ResponseEntity.ok(token);
    }

}
