package com.example.product_service.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.Optional;

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

    private void saveImage(MultipartFile image, String imageName) throws IOException {
        Path cmsPath = Paths.get(cmsImagePath, imageName);
        Path uiPath = Paths.get(uiImagePath, imageName);

        if (Files.exists(uiPath)) {
            Files.delete(uiPath);
        }
        Files.copy(image.getInputStream(), uiPath);

        if (Files.exists(cmsPath)) {
            Files.delete(cmsPath);
        }
        Files.copy(image.getInputStream(), cmsPath);
    }

    @SuppressWarnings("null")
    public String addProduct(String product, String title, String brand, Double price, String category,
            MultipartFile image) {
        try {
            String originalFilename = image.getOriginalFilename();
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String imageName = product.toLowerCase().replaceAll(" ", "_") + fileExtension;

            saveImage(image, imageName);

            ProductModel newProduct = new ProductModel();
            newProduct.setName(product);
            newProduct.setTitle(title);
            newProduct.setBrand(brand);
            newProduct.setPrice(price);
            newProduct.setCategory(category);
            newProduct.setImage("/images/" + imageName);
            newProduct.setUpdateTime(LocalDateTime.now());

            ProductRepo.save(newProduct);

            return "Product added successfully";

        } catch (Exception e) {
            e.printStackTrace();
            return "Error processing product";
        }
    }

    @SuppressWarnings("null")
    public String updateProduct(int productID, String product, String title, String brand, Double price,
            String category, MultipartFile image) throws Exception {
        ProductModel selectedProduct = ProductRepo.findById(productID)
                .orElseThrow(() -> new Exception("Product not found with ID: " + productID));

        selectedProduct.setName(product);
        selectedProduct.setTitle(title);
        selectedProduct.setBrand(brand);
        selectedProduct.setPrice(price);
        selectedProduct.setCategory(category);

        if (image != null && !image.isEmpty()) {
            String originalFilename = image.getOriginalFilename();
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String imageName = product.toLowerCase().replaceAll(" ", "_") + fileExtension;
            selectedProduct.setImage("/images/" + imageName);
            saveImage(image, imageName);

        }

        ProductRepo.save(selectedProduct);
        return "Product updated successfully!";
    }

    public String deleteItem(int productID) {
        Optional<ProductModel> product = ProductRepo.findById(productID);
        if (product.isPresent()) {
            // ProductRepo.delete(product.get());
            return "Product deleted successfully!";
        } else {
            throw new NoSuchElementException("Product not found with ID: " + productID);
        }
    }

    public String togglePrivacyStatus(int productID) {
        Optional<ProductModel> productOptional = ProductRepo.findById(productID);
        
        if (productOptional.isPresent()) {
            ProductModel product = productOptional.get();
            boolean currentStatus = product.getPrivacy();
            product.setPrivacy(!currentStatus);
            
            ProductRepo.save(product);
            
            return currentStatus ? "Product is now marked as public." : "Product is now marked as private.";
        } else {
            throw new NoSuchElementException("Product not found with ID: " + productID);
        }
    }
}
