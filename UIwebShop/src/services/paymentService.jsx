import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:8080/payment',
    headers: {
        'Content-Type': 'application/json',
    },
});

class paymentService {
    static createPaymentURL = async (orderID, price) => {
        try {
            const response = await API.get(`/create_payment_url?price=${price}`);
            if (response) {
                window.open(`http://localhost:8080/payment/create_payment_url?orderID=${orderID}&price=${price}`, "_blank");
            }
        } catch (error) {
            console.error("Error creating payment URL:", error);
            throw error;
        }
    };
}

export default paymentService;
