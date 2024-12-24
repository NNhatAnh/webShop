package com.example.order_service.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.order_service.module.OrderItemModel;
import com.example.order_service.module.OrderItemRequest;
import com.example.order_service.module.OrderListModel;
import com.example.order_service.repository.OrderItemRepo;
import com.example.order_service.repository.OrderListRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class OrderService {
    @Autowired
    private OrderItemRepo OrderItemRepo;

    @Autowired
    private OrderListRepo OrderListRepo;

    public Integer createOrder(int userId) {
        OrderListModel order = new OrderListModel();
        order.setUser(userId);
        order.setStatus(OrderListModel.Status.pending);
        order.setTotalPrice(BigDecimal.ZERO);
        order.setTimeOrder(LocalDateTime.now());

        OrderListModel savedOrder = OrderListRepo.save(order);
        return savedOrder.getId();
    }

    public void addItemsToOrder(Integer orderId, List<OrderItemRequest> items) {
        OrderListModel order = OrderListRepo.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));

        BigDecimal totalPrice = BigDecimal.ZERO;

        for (OrderItemRequest item : items) {
            OrderItemModel orderItem = new OrderItemModel();
            orderItem.setOrder(order);
            orderItem.setProduct(item.getProduct());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPrice(item.getPrice());

            OrderItemRepo.save(orderItem);

            totalPrice = totalPrice.add(item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        }

        order.setTotalPrice(totalPrice);
        OrderListRepo.save(order);
    }

    public String removeProductFromOrder(Integer productID) {
        List<OrderItemModel> orderItems = OrderItemRepo.findByProduct(productID);
    
        if (orderItems.isEmpty()) {
            throw new EntityNotFoundException("Product not found in this order");
        }
    
        OrderItemRepo.deleteAll(orderItems);
    
        List<OrderItemModel> remainingItems = OrderItemRepo.findByOrder(orderItems.get(0).getOrder());
    
        if (remainingItems.isEmpty()) {
            OrderListRepo.deleteById(orderItems.get(0).getOrder().getId());
            return "Order deleted as it no longer has any items";
        }
    
        BigDecimal totalPrice = remainingItems.stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    
        OrderListModel order = orderItems.get(0).getOrder();
        order.setTotalPrice(totalPrice);
        OrderListRepo.save(order);
    
        return "Product removed successfully, and order updated";
    }
    

    public String orderAction(int orderID) {
        Optional<OrderListModel> orderSelected = OrderListRepo.findById(orderID);
        if (orderSelected.isPresent()) {
            OrderListModel order = orderSelected.get();
            if (order.getStatus() == OrderListModel.Status.pending) {
                order.setStatus(OrderListModel.Status.completed);
            } else {
                order.setStatus(OrderListModel.Status.pending);
            }
            OrderListRepo.save(order);
            return "Order status updated to completed";
        } else {
            throw new EntityNotFoundException("Order not found for ID: " + orderID);
        }
    }
}
