import axios from "axios";

const API = axios.create({
    baseURL: `http://localhost:8080/order`,
    headers: {
        "Content-Type": "application/json",
    },
});

class orderService {
    // API for getting order details
    static orderDetail = async (orderID) => {
        try {
            const response = await API.get(`/${orderID}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    // API for getting user cart
    static userCart = async (userID) => {
        try {
            const response = await API.get(`/user/${userID}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    // API to delete order
    static deleteOrder = async (orderID) => {
        try {
            const response = await API.delete(`/delete/${orderID}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    // API for listing all orders
    static listOrder = async () => {
        try {
            const response = await API.get("/listOrder");
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    // API for adding items to an order
    static addItem = async (userID, cartItems) => {
        try {
            const response = await API.post("/create", { user_id: userID });
            const orderID = response.data.order_id;

            const itemsResponse = await API.post(`/add/${orderID}`, cartItems);
            return itemsResponse.data;
        } catch (error) {
            console.error("Failed to add items to order:", error);
            throw error;
        }
    };
}

export default orderService;
