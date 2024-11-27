package com.example.webshop_service.repository;

import com.example.webshop_service.module.OrderItemModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderItemRepo extends JpaRepository<OrderItemModel, Integer> {
    @Query("SELECT o FROM OrderItemModel o WHERE o.order.id = :orderId")
    List<OrderItemModel> findByOrderId(@Param("orderId") int orderId);
}
