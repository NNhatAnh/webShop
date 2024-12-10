import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:8080/user',
    headers: {
        'Content-Type': 'application/json',
    },
});

class adminService {
    
    // API for login
    static login = async (username, password) => {
        const response = await API.post("/signin", { username, password });
        return response.data;
    };

    // API for signup
    static signup = async (email, username, password) => {
        const response = await API.post("/signup", { email, username, password });
        return response.data;
    };
}

export default adminService;
