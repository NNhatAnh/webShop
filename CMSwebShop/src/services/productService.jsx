import axios from "axios";

const API = axios.create({
    baseURL: `http://localhost:8080/product`,
    headers: {
        'Content-Type': 'application/json',
    },
});

class productService {
    // API for each product
    static productDetail = async (productID) => {
        try {
            const response = await API.get(`/${productID}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    // API to add item to storage
    static addItem = async (formData) => {
        try {
            const response = await API.post("/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    // API to update product
    static updateProduct = async (formData, productID) => {
        try {
            const response = await API.put(`/update/${productID}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch(error) {
            console.error(error);
            throw error;
        }
    }

    // API for delete item
    static deleteItem = async (productID) => {
        try {
            const response = await API.delete(`/delete/${productID}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch(error) {
            console.error(error);
            throw error;
        }
    }
    
    // API to list all products
    static listProduct = async () => {
        try {
            const response = await API.get("/listProduct");
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
}

export default productService;
