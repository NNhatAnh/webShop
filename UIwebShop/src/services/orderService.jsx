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
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching order details:", error);
            throw error;
        }
    }

    // API list all order
    static listOrder = async () => {
        try {
            const response = await API.get("/listOrder");
            console.log("Response:", response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}

export default orderService;