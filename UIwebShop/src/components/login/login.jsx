import React, { useState, useEffect } from "react";
import "./login.css";
import userService from "../../services/userService";
import useAuth from "../../hooks/useAuth";

export default function Login({ closePopup }) {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: "", username: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const decodedToken = useAuth.DecodeToken(storedUser);
            setUser(decodedToken?.data || null);
        }
    }, []);

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setFormData({ email: "", username: "", password: "" });
        setErrorMessage("");
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const response = await userService.login(formData.username, formData.password);
                localStorage.setItem("user", JSON.stringify(response));
                setUser(response);
                alert("Login successful!");
                closePopup();
            } else {
                await userService.signup(formData.email, formData.username, formData.password);
                alert("Signup successful!");
                toggleForm();
            }
        } catch (error) {
            setErrorMessage(error.response?.data || "An error occurred. Please try again.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <div className="login-popup">
            <div className="login-popup__content">
                <button className="login-popup__close-btn" onClick={closePopup}>
                    ✖
                </button>

                {user ? (
                    <div className="user-info">
                        <h2 className="user-info__title">User Information</h2>
                        <div className="user-info__details">
                            <div className="user-info__item">
                                <span className="user-info__label">Username:</span>
                                <span className="user-info__value">{user.username}</span>
                            </div>
                            <div className="user-info__item">
                                <span className="user-info__label">Email:</span>
                                <span className="user-info__value">{user.email}</span>
                            </div>
                            <div className="user-info__item">
                                <span className="user-info__label">Phone:</span>
                                <span className="user-info__value">{user.phone || "Not provided yet"}</span>
                            </div>
                            <div className="user-info__item">
                                <span className="user-info__label">Address:</span>
                                <span className="user-info__value">{user.address || "Not provided yet"}</span>
                            </div>
                        </div>
                        <button className="user-info__logout-btn" onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    isLogin ? (
                        <div className="login-form">
                            <h2>Login</h2>
                            <form className="login-popup__form" onSubmit={handleSubmit}>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Enter your username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                                <button type="submit">Login</button>
                            </form>
                            <p className="toggle-form-text">
                                Don't have an account?{" "}
                                <span onClick={toggleForm} className="toggle-link">Sign Up</span>
                            </p>
                        </div>
                    ) : (
                        <div className="signup-form">
                            <h2>Sign Up</h2>
                            <form className="login-popup__form" onSubmit={handleSubmit}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Enter your username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                                <button type="submit">Sign Up</button>
                            </form>
                            <p className="toggle-form-text">
                                Already have an account?{" "}
                                <span onClick={toggleForm} className="toggle-link">Login</span>
                            </p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
