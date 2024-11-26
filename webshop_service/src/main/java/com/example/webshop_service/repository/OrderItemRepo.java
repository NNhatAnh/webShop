package com.example.webshop_service.repository;

import com.example.webshop_service.module.OrderItemModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepo extends JpaRepository<OrderItemModel, Integer> {
}
