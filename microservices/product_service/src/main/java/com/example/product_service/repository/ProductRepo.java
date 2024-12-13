package com.example.product_service.repository;

import com.example.product_service.module.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;


@Repository
public interface ProductRepo extends JpaRepository<ProductModel, Integer> {
    Optional<ProductModel> findByID(int productID);
}
