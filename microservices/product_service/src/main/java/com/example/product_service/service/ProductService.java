package com.example.product_service.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.product_service.module.ProductModel;
import com.example.product_service.repository.ProductRepo;

@Service
public class ProductService {
    @Autowired
    private ProductRepo ProductRepo;

    @Value("D:/project/webShop/CMSwebShop/public/images")
    private String cmsImagePath;

    @Value("D:/project/webShop/UIwebShop/public/images")
    private String uiImagePath;

    public String addProduct(String product, String title, String brand, Double price, String category,
            MultipartFile image) {
        try {
            String imageName = image.getOriginalFilename();

            Path CMSPath = Paths.get(cmsImagePath, imageName);
            Path UIPath = Paths.get(uiImagePath, imageName);

            ProductModel newProduct = new ProductModel();
            newProduct.setName(product);
            newProduct.setTitle(title);
            newProduct.setBrand(brand);
            newProduct.setPrice(price);
            newProduct.setCategory(category);
            newProduct.setImage("/images/" + image.getOriginalFilename());
            newProduct.setUpdateTime(LocalDateTime.now());

            ProductRepo.save(newProduct);

            Files.copy(image.getInputStream(), CMSPath);
            Files.copy(image.getInputStream(), UIPath);

            return "Product added successfully";

        } catch (Exception e) {
            e.printStackTrace();
            return "Error processing product";
        }
    }
}
