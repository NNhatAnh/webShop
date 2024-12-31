import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/payment",
  headers: {
    "Content-Type": "application/json",
  },
});

class paymentService {
  static createPaymentURL = async (orderID, price) => {
    try {
      const payload = {
        orderID: orderID,
        price: price,
      };

      const response = await API.post("/", payload);
      if (response) {
          window.open(`http://localhost:8080/payment/create_payment_url`, "_blank");
      }
    } catch (error) {
      console.error("Error creating payment URL:", error);
      alert("Failed to create payment URL. Please try again later.");
      throw error;
    }
  };
}

export default paymentService;
