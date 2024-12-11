import axios from "axios";

const API = axios.create({
    baseURL: `http://localhost:8080/order`,
    headers: {
        'Content-Type': 'application/json',
    },
})

class orderService {

    // API for list item
    static orderDetail = async (orderID) => {
        try {
            const response = await API.get(`/${orderID}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // API for user cart
    static userCart = async (userID) => {
        try {
            const response = await API.get(`/user/${userID}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // API list all order
    static listOrder = async () => {
        try {
            const response = await API.get("/listOrder");
            return response.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}

export default orderService;