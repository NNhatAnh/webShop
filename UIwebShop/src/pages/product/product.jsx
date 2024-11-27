import React, { useState, useEffect } from "react";
import "./product.css";

export default function Product() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function listProduct() {
        try {
            const response = await fetch("http://localhost:8080/order/listOrder");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setProducts(data);
            console.log(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        listProduct();
    }, []);

    return (
        <div className="product-container">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
                <ul>
                    {products.map((product, index) => (
                        <li key={index} className="product-item">
                            <p><strong>Order ID:</strong> {product.orderId}</p>
                            <p><strong>Product Name:</strong> {product.name}</p>
                            <p><strong>Price:</strong> ${product.price}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
