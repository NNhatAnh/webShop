import axios from "axios";

const API = axios.create({
    baseURL: `http://localhost:8080/product`,
    headers: {
        'Content-Type': 'application/json',
    },
})

class productService {

    // APi for each product
    static productDetail = async (productID) => {
        try {
            const response = await API.get(`/${productID}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // API list all product
    static listProduct = async () => {
        try {
            const response = await API.get("/listProduct");
            return response.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}

export default productService;