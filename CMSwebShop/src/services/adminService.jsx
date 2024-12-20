import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:8080/user',
    headers: {
        'Content-Type': 'application/json',
    },
});

class adminService {
    
    // API to take user information base on the userID
    static getUser = async (userID) => {
        const response = await API.get(`/${userID}`);
        return response.data;
    };

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
