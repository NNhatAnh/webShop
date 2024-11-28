package com.example.webshop_service.controller;

import com.example.webshop_service.module.UserModel;
import com.example.webshop_service.repository.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
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
