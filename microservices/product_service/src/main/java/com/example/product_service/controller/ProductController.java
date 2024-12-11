package com.example.product_service.controller;

import com.example.product_service.module.ProductModel;
import com.example.product_service.repository.ProductRepo;
import com.example.product_service.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://localhost:8080")
public class ProductController {
    @Autowired
    private ProductRepo ProductRepo;

    @Autowired
    private ProductService ProductService;

    @GetMapping("/{productID}")
    public List<ProductModel> productDetail(@PathVariable int productID) {
        List<ProductModel> productDetail = ProductRepo.findByID(productID);
        return productDetail;
    }

    @GetMapping("/listProduct")
    public List<ProductModel> getListProduct() {
        return ProductRepo.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<?> addProduct(
            @RequestParam("product") String product,
            @RequestParam("title") String title,
            @RequestParam("brand") String brand,
            @RequestParam("price") Double price,
            @RequestParam("category") String category,
            @RequestParam("image") MultipartFile image) {
        try {
            String result = ProductService.addProduct(product, title, brand, price, category, image);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing request");
        }
    }
}
