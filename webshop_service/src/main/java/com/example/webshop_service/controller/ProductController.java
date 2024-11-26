package com.example.webshop_service.controller;

import com.example.webshop_service.module.ProductModel;
import com.example.webshop_service.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {
    @Autowired
    private ProductRepo ProductRepo;

    @GetMapping("/getAllProduct")
    public List<ProductModel> getListProduct() {
        return ProductRepo.findAll();
    }

}
