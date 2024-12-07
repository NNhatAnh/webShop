import axios from "axios";

const API = axios.create({
    baseURL: `http://localhost:1040/product`,
    headers: {
        'Content-Type': 'application/json',
    },
})

class productService {

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