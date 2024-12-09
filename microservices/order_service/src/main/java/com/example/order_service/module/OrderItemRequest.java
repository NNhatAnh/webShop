package com.example.order_service.module;

import java.math.BigDecimal;

public class OrderItemRequest {
    private int product;
    private int quantity;
    private BigDecimal price;

    // Getters and Setters
    public int getProduct() {
        return product;
    }

    public void setProduct(int product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
