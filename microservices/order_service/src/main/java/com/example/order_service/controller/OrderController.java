package com.example.order_service.controller;

import com.example.order_service.module.OrderItemModel;
import com.example.order_service.module.OrderListModel;
import com.example.order_service.repository.OrderItemRepo;
import com.example.order_service.repository.OrderListRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {
    @Autowired
    private OrderItemRepo orderItemRepo;

    @Autowired
    private OrderListRepo orderListRepo;

    @GetMapping("/")
    public String orderHome() {
        return "Order Page";
    }

    @GetMapping("/listOrder")
    public List<OrderListModel> listOrder() {
        List<OrderListModel> listOrder = orderListRepo.findAll();
        return listOrder;
    }

    // API for get user cart
    @GetMapping("/user/{userID}")
    public List<OrderListModel> userOrder(@PathVariable int userID) {
        List<OrderListModel> userOrder = orderListRepo.findByUser(userID);
        return userOrder;
    }

    // API for get order detail
    @GetMapping("/{orderID}")
    public List<OrderItemModel> orderDetail(@PathVariable int orderID) {
        List<OrderItemModel> orderDetail = orderItemRepo.orderDetail(orderID);
        return orderDetail;
    }
}
