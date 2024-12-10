import './order_list.css';
import React, { useState, useEffect } from 'react';
import orderService from '../../component/services/orderService';
import adminService from '../../component/services/adminService';
import { Link } from 'react-router-dom';

function Order_list() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    async function listOrderWithUsernames() {
        try {
            const orderData = await orderService.listOrder();

            const ordersWithUsernames = await Promise.all(
                orderData.map(async (order) => {
                    try {
                        const users = await adminService.getUser(order.user);
                        const foundUser = users.find((u) => u.id === order.user);
                        return {
                            ...order,
                            username: foundUser ? foundUser.username : 'Unknown',
                            timeOrderFormatted: formatDateTime(order.timeOrder),
                        };
                    } catch (err) {
                        return {
                            ...order,
                            username: 'Unknown',
                            timeOrderFormatted: 'Unknown',
                        };
                    }
                })
            );

            setOrders(ordersWithUsernames);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        listOrderWithUsernames();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="admin-content-main-content">
            <h2>List Order</h2>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Status</th>
                        <th>Total price</th>
                        <th>Time Order</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.username}</td>
                            <td>{order.status}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.timeOrderFormatted}</td>
                            <td>
                                <button className="btn btn-edit">
                                    <Link to={`/orderItem`}>Detail</Link>
                                </button>
                                <button className="btn btn-delete">Done</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Order_list;
