package com.example.webshop_service.controller;

import com.example.webshop_service.module.OrderListModel;
import com.example.webshop_service.repository.OrderItemRepo;
import com.example.webshop_service.repository.OrderListRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
        List<OrderListModel> listOrder = orderListRepo.listOrder();
        return listOrder;
    }
}
