import './order_list.css'
import React, { useState, useEffect } from "react";
import orderService from '../../component/services/orderService';
import { data } from 'react-router-dom';
function Order_item(){

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // async function listOrder() {
    //     try {
    //         const data = await orderService.listOrder();
    //         setOrders(data);
    //         setLoading(false);
    //     } catch (err) {
    //         setError(err.message);
    //         setLoading(false);
    //     }
    // }

    // useEffect(() => {
    //     listOrder();
    //     console.log(data)
    // }, []);

    return(
        <div className="admin-content-main-content">
            <h2>List Order</h2>
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
                
                    <tr >
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
        
                </tbody>
            </table>
        </div>


    );
}

export default Order_item