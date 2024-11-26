package com.example.webshop_service.repository;

import com.example.webshop_service.module.ReviewModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepo extends JpaRepository<ReviewModel, Integer> {
    List<ReviewModel> findByProductId(Integer productId);
}
