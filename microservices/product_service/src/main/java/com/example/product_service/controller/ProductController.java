package com.example.product_service.controller;

import com.example.product_service.module.ProductModel;
import com.example.product_service.repository.ProductRepo;
import com.example.product_service.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://localhost:8080")
public class ProductController {
    @Autowired
    private ProductRepo ProductRepo;

    @Autowired
    private ProductService ProductService;

    // API for product information
    @GetMapping("/{productID}")
    public Optional<ProductModel> productDetail(@PathVariable int productID) {
        Optional<ProductModel> productDetail = ProductRepo.findByID(productID);
        return productDetail;
    }

    // API for list all products
    @GetMapping("/listProduct")
    public List<ProductModel> getListProduct() {
        return ProductRepo.findAll();
    }

    // API to create new product
    @PostMapping("/add")
    public ResponseEntity<?> addProduct(
            @RequestParam("product") String product,
            @RequestParam("title") String title,
            @RequestParam("brand") String brand,
            @RequestParam("price") Double price,
            @RequestParam("category") String category,
            @RequestParam("image") MultipartFile image) {
        try {
            String response = ProductService.addProduct(product, title, brand, price, category, image);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing request");
        }
    }

    // API for update product information
    @PutMapping("/update/{productID}")
    public ResponseEntity<?> updateProduct(
            @PathVariable int productID,
            @RequestParam("product") String product,
            @RequestParam("title") String title,
            @RequestParam("brand") String brand,
            @RequestParam("price") Double price,
            @RequestParam("category") String category,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            String response = ProductService.updateProduct(productID, product, title, brand, price, category, image);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing request");
        }
    }

    // API for delete item
    @DeleteMapping("/delete/{productID}")
    public ResponseEntity<String> deleteItem(@PathVariable int productID) {
        try {
            String response = ProductService.deleteItem(productID);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found with ID: " + productID);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting product.");
        }
    }

    // API for delete item
    @PutMapping("/action/{productID}")
    public ResponseEntity<String> privacyProduct(@PathVariable int productID) {
        try {
            String response = ProductService.togglePrivacyStatus(productID);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found with ID: " + productID);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting product.");
        }
    }
}
