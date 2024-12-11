import './order_item.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import orderService from '../../services/orderService';
import productService from '../../services/productService';

function Order_item() {
    const { id } = useParams(); // Lấy order ID từ URL
    const [orderDetail, setOrderDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hàm lấy chi tiết đơn hàng và sản phẩm
    async function fetchOrderDetail(orderId) {
        try {
            const data = await orderService.orderDetail(orderId); // Gọi API lấy chi tiết đơn hàng

            // Lấy tên sản phẩm cho từng item trong đơn hàng
            const detailWithProductNames = await Promise.all(
                data.map(async (item) => {
                    try {
                        const productData = await productService.productDetail(item.product);
                        return {
                            ...item,
                            productName: productData ? productData.name : 'Unknown', // Gán tên sản phẩm
                        };
                    } catch (err) {
                        return {
                            ...item,
                            productName: 'Unknown', // Gán tên sản phẩm là Unknown nếu có lỗi
                        };
                    }
                })
            );

            setOrderDetail(detailWithProductNames);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            fetchOrderDetail(id); // Gọi hàm fetchOrderDetail khi có order ID
        }
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="admin-content-main-content">
            <h2>Order Details</h2>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetail.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.productName}</td> {/* Hiển thị tên sản phẩm */}
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Order_item;
