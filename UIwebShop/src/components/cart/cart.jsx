import React, { useState, useEffect } from "react";
import "./cart.css";
import orderService from "../../services/orderService";

export default function Cart({ closePopup }) {
    const [cartItems, setCartItems] = useState([]);

    // async function CartList() {
    //     try {
    //         const data = await orderService.
    //     }
    // }

    const handleRemoveItem = (index) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart)); 
    };

    const handleCheckout = () => {
        alert("Checkout successful!");
        setCartItems([]);
        closePopup();
    };

    return (
        <div className="cart-popup">
            <div className="cart-popup__content">
                <button className="cart-popup__close-btn" onClick={closePopup}>
                    ✖
                </button>
                <h2>Your Cart</h2>
                {cartItems.length > 0 ? (
                    <div className="cart-items">
                        {cartItems.map((item, index) => (
                            <div className="cart-item" key={index}>
                                <div className="cart-item__details">
                                    <p className="cart-item__name">{item.name}</p>
                                    <p className="cart-item__price">${item.price}</p>
                                </div>
                                <button
                                    className="cart-item__remove-btn"
                                    onClick={() => handleRemoveItem(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button className="cart-popup__checkout-btn" onClick={handleCheckout}>
                            Checkout
                        </button>
                    </div>
                ) : (
                    <p>Your cart is empty!</p>
                )}
            </div>
        </div>
    );
}
