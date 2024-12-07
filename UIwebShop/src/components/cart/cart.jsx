import React, { useState, useEffect } from "react";
import "./cart.css";
import { useParams } from "react-router-dom";
import orderService from "../../services/orderService";
import productService from "../../services/productService";
import useAuth from "../../hooks/useAuth";

export default function Cart({ closePopup }) {
    const [cartItems, setCartItems] = useState([]);
    const { userID } = useParams();

    async function CartList(userID) {
        try {
            if (!userID) {
                throw new Error("userID is required to fetch order details");
            }

            const data = await orderService.userCart(userID);

            if (data.length > 0) {
                const allOrderDetails = [];
                const allOrderProduct = [];

                for (let i = 0; i < data.length; i++) {
                    const orderDetail = await orderService.orderDetail(data[i].id);
                    allOrderDetails.push(...orderDetail);
                }

                for (let i = 0; i < allOrderDetails.length; i++) {
                    const productOrder = await productService.productDetail(allOrderDetails[i].product);

                    if (Array.isArray(productOrder)) {
                        allOrderProduct.push(...productOrder);
                    } else {
                        allOrderProduct.push(productOrder);
                    }
                }

                const mergedCartItems = allOrderDetails.map((orderItem) => {
                    const product = allOrderProduct.find(
                        (product) => product.id === orderItem.product
                    );
                    if (product) {
                        return {
                            ...orderItem,
                            productDetail: product
                        };
                    }
                    return orderItem;
                });

                setCartItems(mergedCartItems);
            } else {
                console.log("No cart data found for the user.");
            }
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("user");
        const userID = useAuth.getUserID(token);
        if (userID) {
            CartList(userID);
        }
    }, [userID]);

    const handleRemoveItem = (index) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
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
                            <div className="cart-item" key={item.id || index}>
                                <div className="cart-item__details">
                                    <div className="cart-item__image">
                                        <img src={item.productDetail.image} alt={item.productDetail.name} />
                                    </div>
                                    <div className="cart-item__text">
                                        <p className="cart-item__name">
                                            {item.productDetail ? item.productDetail.name : "Unknown Product"}
                                        </p>
                                        <p className="cart-item__price">${item.price}</p>
                                        <p className="cart-item__quantity">Quantity: {item.quantity}</p>
                                        <p className="cart-item__status">Status: {item.status || "Pending"}</p>
                                    </div>
                                </div>
                                <button
                                    className="cart-item__remove-btn"
                                    onClick={() => handleRemoveItem(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                    </div>
                ) : (
                    <p>Your cart is empty!</p>
                )}
            </div>
        </div>
    );
}
