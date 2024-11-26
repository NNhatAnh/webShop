package com.example.webshop_service.repository;

import com.example.webshop_service.module.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<ProductModel, Integer> {
}
