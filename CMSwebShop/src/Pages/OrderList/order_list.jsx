import './order_list.css'
import React, { useState, useEffect } from "react";
import orderService from '../../component/services/orderService';
import { data } from 'react-router-dom';
import { Link } from "react-router-dom";

function Order_list(){

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    async function listOrder() {
        try {
            const data = await orderService.listOrder();
            setOrders(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        listOrder();
        console.log(data)
    }, []);

    return(
        <div className="admin-content-main-content">
            <h2>List Order</h2>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User id</th>
                        <th>Status</th>
                        <th>Total price</th>
                        <th>Time Order</th>
                        <th>Aciton</th>
                    </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.user}</td>
                            <td>{order.status}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.timeOrder}</td>
                            <td>
                                <button className="btn btn-edit">
                                    <Link
                                        to={{
                                            pathname: `/orderItem`,
                                        }}
                                    >
                                        Detail
                                    </Link>
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

export default Order_list