package com.example.user_service.controller;

import com.example.user_service.module.UserModel;
import com.example.user_service.reposotory.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/user")
public class userController {
    @Autowired
    private UserRepo UserRepo;

    @GetMapping("/")
    public String home() {
        return "Web app sell watch";
    }

    @GetMapping("/{userID}")
    public List<UserModel> getMethodName(@PathVariable int userID) {
        List<UserModel> userDetail = UserRepo.user(userID);
        return userDetail;
    }

    @GetMapping("/listUser")
    public List<UserModel> getUserList() {
        return UserRepo.findAll();
    }
}
