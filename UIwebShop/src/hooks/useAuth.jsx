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

    static DecodeToken = (token) => {
        try {
            const decoded = jwtDecode(token);
            return decoded;
        } catch (error) {
            console.error("Invalid token:", error);
            return null;
        }
    }
};

export default useAuth;