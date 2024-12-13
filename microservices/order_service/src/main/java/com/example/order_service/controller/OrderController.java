package com.example.order_service.controller;

import com.example.order_service.module.OrderItemModel;
import com.example.order_service.module.OrderItemRequest;
import com.example.order_service.module.OrderListModel;
import com.example.order_service.module.OrderListModel.Status;
import com.example.order_service.repository.OrderItemRepo;
import com.example.order_service.repository.OrderListRepo;
import com.example.order_service.service.OrderService;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {
    @Autowired
    private OrderItemRepo OrderItemRepo;

    @Autowired
    private OrderListRepo OrderListRepo;

    @Autowired
    private OrderService OrderService;

    @GetMapping("/")
    public String orderHome() {
        return "Order Page";
    }

    // Fetch all orders
    @GetMapping("/listOrder")
    public List<OrderListModel> listOrder() {
        return OrderListRepo.findAll();
    }

    // Fetch orders for a specific user
    @GetMapping("/user/{userID}")
    public ResponseEntity<List<OrderListModel>> userOrder(@PathVariable int userID) {
        List<OrderListModel> userOrder = OrderListRepo.findByUser(userID);
        if (userOrder.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
        return ResponseEntity.ok(userOrder);
    }

    // Fetch details of a specific order
    @GetMapping("/{orderID}")
    public ResponseEntity<List<OrderItemModel>> orderDetail(@PathVariable int orderID) {
        List<OrderItemModel> orderDetail = OrderItemRepo.orderDetail(orderID);
        if (orderDetail.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
        return ResponseEntity.ok(orderDetail);
    }

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody Map<String, Integer> request) {
        try {
            int userId = request.get("user_id");
            Integer orderId = OrderService.createOrder(userId);

            Map<String, Object> response = Map.of("order_id", orderId);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", "Failed to create order."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // API for add item into order
    @PostMapping("/add/{orderID}")
    public ResponseEntity<Map<String, Object>> addOrderItems(@PathVariable Integer orderID,
            @RequestBody List<OrderItemRequest> items) {
        try {
            OrderService.addItemsToOrder(orderID, items);
            return new ResponseEntity<>(Map.of("message", "Items added successfully."), HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", "Failed to add items to order."),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{orderID}")
    public ResponseEntity<String> deleteOrder(@PathVariable int orderID) {
        try {
            if (!OrderListRepo.existsById(orderID)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found.");
            }

            List<OrderItemModel> deleteItems = OrderItemRepo.orderDetail(orderID);
            OrderItemRepo.deleteAll(deleteItems);

            OrderListRepo.deleteById(orderID);
            return ResponseEntity.ok("Order and its items have been deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete the order. Error: " + e.getMessage());
        }
    }

    @PutMapping("/status/{orderID}")
    public ResponseEntity<String> updateOrderStatus(@PathVariable int orderID) {
        try {
            String response = OrderService.orderAction(orderID);
            return ResponseEntity.ok(response);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating order status: " + e.getMessage());
        }
    }
}
