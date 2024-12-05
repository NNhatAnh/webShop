package com.example.order_service.repository;

import com.example.order_service.module.OrderListModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderListRepo extends JpaRepository<OrderListModel, Integer> {
    @Query("SELECT o FROM OrderListModel o")
    List<OrderListModel> listOrder();
}
