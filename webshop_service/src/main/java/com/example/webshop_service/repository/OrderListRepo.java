package com.example.webshop_service.repository;

import com.example.webshop_service.module.OrderListModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderListRepo extends JpaRepository<OrderListModel, Integer> {
    @Query("SELECT o.id, o.status, o.totalPrice, o.timeOrder FROM OrderListModel o")
    List<Object> listOrder();
}
