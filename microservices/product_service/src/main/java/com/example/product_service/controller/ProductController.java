package com.example.product_service.controller;

import com.example.product_service.module.ProductModel;
import com.example.product_service.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://localhost:8080")
public class ProductController {
    @Autowired
    private ProductRepo ProductRepo;

    @GetMapping("/{productID}")
    public List<ProductModel> productDetail(@PathVariable int productID) {
        List<ProductModel> productDetail = ProductRepo.findByID(productID);
        return productDetail;
    }

    @GetMapping("/listProduct")
    public List<ProductModel> getListProduct() {
        return ProductRepo.findAll();
    }

}
