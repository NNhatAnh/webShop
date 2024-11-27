package com.example.webshop_service.repository;

import com.example.webshop_service.module.OrderListModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderListRepo extends JpaRepository<OrderListModel, Integer> {
    @Query("SELECT o FROM OrderListModel o WHERE o.user.id = :userID")
    List<OrderListModel> listOrder(@Param("userID") int userID);
}
