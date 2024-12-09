package com.example.order_service.repository;

import com.example.order_service.module.OrderListModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderListRepo extends JpaRepository<OrderListModel, Integer> {
    List<OrderListModel> findByUser(int user);
    Optional<OrderListModel> findById(int id);
    
}
