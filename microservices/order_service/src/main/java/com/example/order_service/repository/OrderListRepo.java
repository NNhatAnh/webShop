package com.example.order_service.repository;

import com.example.order_service.module.OrderListModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderListRepo extends JpaRepository<OrderListModel, Integer> {
    List<OrderListModel> findByUser(int user);
}
