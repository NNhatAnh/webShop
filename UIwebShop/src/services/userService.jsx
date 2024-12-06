import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:1039/user',
    headers: {
        'Content-Type': 'application/json',
    },
});

class userService {
    
    // API for login
    static login = async (username, password) => {
        const response = await API.post("/login", { username, password });
        return response.data;
    };

    // API for signup
    static signup = async (email, username, password) => {
        console.log({
            'email': email,
            'username': username,
            'password': password
        })
        const response = await API.post("/signup", { email, username, password });
        return response.data;
    };
}

export default userService;
