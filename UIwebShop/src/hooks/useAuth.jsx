import { jwtDecode } from 'jwt-decode';

class useAuth {

    static getUserID = (token) => {
        try {
            const decoded = jwtDecode(token);
            return decoded.data.id;
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    };

    static getUserRole = (token) => {
        try {
            const decoded = jwtDecode(token);
            return decoded.data.role;
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    };

    static DecodeToken = (token) => {
        try {
            const decoded = jwtDecode(token);
            return decoded;
        } catch (error) {
            console.error("Invalid token:", error);
            return null;
        }
    }

    static checkExpired = (token) => {
        const currentDate = Math.floor(Date.now() / 1000);
        return currentDate > token.exp;
    }
};

export default useAuth;