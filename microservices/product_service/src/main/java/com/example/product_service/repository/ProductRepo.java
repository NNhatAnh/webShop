package com.example.product_service.repository;

import com.example.product_service.module.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface ProductRepo extends JpaRepository<ProductModel, Integer> {
    List<ProductModel> findByID(int iD);
}
