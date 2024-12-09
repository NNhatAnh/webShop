import React, { useState, useEffect } from "react";
import "./cart.css";
import { useParams } from "react-router-dom";
import orderService from "../../services/orderService";
import productService from "../../services/productService";
import useAuth from "../../hooks/useAuth";

export default function Cart({ closePopup }) {
    const [cartItems, setCartItems] = useState([]);
    const { userID } = useParams();

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    async function CartList(userID) {
        try {
            const data = await orderService.userCart(userID);

            if (data.length > 0) {
                const allOrderDetails = [];
                const allOrderProduct = [];

                for (let i = 0; i < data.length; i++) {
                    const orderDetail = await orderService.orderDetail(data[i].id);
                    if (Array.isArray(orderDetail)) {
                        const detailedWithTimeOrder = orderDetail.map((item) => ({
                            ...item,
                            timeOrder: formatDate(data[i].timeOrder),
                            orderID: data[i].id,
                        }));
                        allOrderDetails.push(...detailedWithTimeOrder);
                    } else {
                        console.warn(`Order details for order ID ${data[i].id} are not an array`);
                    }
                }

                for (let i = 0; i < allOrderDetails.length; i++) {
                    const productOrder = await productService.productDetail(allOrderDetails[i].product);
                    if (productOrder) {
                        if (Array.isArray(productOrder)) {
                            allOrderProduct.push(...productOrder);
                        } else {
                            allOrderProduct.push(productOrder);
                        }
                    } else {
                        console.warn(`Product details for product ID ${allOrderDetails[i].product} not found`);
                    }
                }

                // Group cart items
                const groupedCartItems = allOrderDetails.reduce((acc, orderItem) => {
                    const product = allOrderProduct.find(
                        (product) => product.id === orderItem.product
                    );
                    if (product) {
                        const orderIndex = acc.findIndex(order => order.orderID === orderItem.orderID);
                        if (orderIndex === -1) {
                            acc.push({
                                orderID: orderItem.orderID,
                                timeOrder: orderItem.timeOrder,
                                products: [{
                                    ...orderItem,
                                    productDetail: product,
                                }],
                            });
                        } else {
                            acc[orderIndex].products.push({
                                ...orderItem,
                                productDetail: product,
                            });
                        }
                    }
                    return acc;
                }, []);

                setCartItems(groupedCartItems);
            } else {
                console.log("No cart data found for the user.");
            }
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("user");
        if (token !== null) {
            const userID = useAuth.getUserID(token);
            if (userID) {
                CartList(userID);
            }
        }
    }, [userID]);

    const handleRemoveOrder = async (orderID) => {
        try {
            const result = await orderService.deleteOrder(orderID);
            console.log("Order deleted successfully:", result);

            setCartItems((prevCartItems) =>
                prevCartItems.filter((order) => order.orderID !== orderID)
            );
        } catch (error) {
            console.error("Failed to delete order:", error);
            alert("Could not delete the order. Please try again.");
        }
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
                        {cartItems.map((order) => {
                            const totalAmount = order.products.reduce((sum, item) => {
                                return sum + (item.productDetail?.price || 0) * item.quantity;
                            }, 0);

                            return (
                                <div className="cart-order" key={order.orderID}>
                                    <h3>Order Time: {order.timeOrder}</h3>
                                    <div className="cart-order__products">
                                        {order.products.map((item, productIndex) => (
                                            <div className="cart-item" key={item.id || productIndex}>
                                                <div className="cart-item__details">
                                                    <div className="cart-item__image">
                                                        {item.productDetail?.image ? (
                                                            <img
                                                                src={item.productDetail.image}
                                                                alt={item.productDetail.name || "Product"}
                                                            />
                                                        ) : (
                                                            <img
                                                                src="/path/to/default-image.jpg"
                                                                alt="Default Product"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="cart-item__text">
                                                        <p className="cart-item__name">
                                                            {item.productDetail?.name || "Unknown Product"}
                                                        </p>
                                                        <p className="cart-item__price">${item.productDetail?.price || 0}</p>
                                                        <p className="cart-item__quantity">Quantity: {item.quantity}</p>
                                                        <p className="cart-item__status">Status: {item.status || "Pending"}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="cart-order__footer">
                                        <p className="cart-order__total">Total: ${totalAmount.toFixed(2)}</p>
                                        <button
                                            className="cart-order__remove-btn"
                                            onClick={() => handleRemoveOrder(order.orderID)}
                                        >
                                            Remove Order
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p>Your cart is empty!</p>
                )}
            </div>
        </div>
    );
}
