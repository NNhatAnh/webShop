package com.example.webshop_service.controller;

import com.example.webshop_service.module.OrderItemModel;
import com.example.webshop_service.module.OrderListModel;
import com.example.webshop_service.repository.OrderItemRepo;
import com.example.webshop_service.repository.OrderListRepo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{userID}")
    public List<OrderListModel> orderById(@PathVariable int userID) {
        List<OrderListModel> userOrder = orderListRepo.listOrder(userID);
        return userOrder;
    }

    @GetMapping("/orderDetail/{orderID}")
    public List<OrderItemModel> orderDetail(@PathVariable int orderID) {
        List<OrderItemModel> orderDetail = orderItemRepo.findByOrderId(orderID);
        return orderDetail;
    }
}
