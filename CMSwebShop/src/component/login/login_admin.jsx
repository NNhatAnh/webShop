import React, { useState, useEffect } from "react";
import "./login_admin.css";
import useAuth from "../hooks/useAuth";
import adminService from "../../services/adminService.jsx";
export default function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      const decodedToken = useAuth.DecodeToken(storedAdmin);
      if (decodedToken?.data) {
        if (checkExpired(decodedToken.exp)) {
          alert("Admin Token expired !");
          localStorage.removeItem("admin");
        } else {
          onLoginSuccess(); // Nếu đã đăng nhập, báo hiệu thành công
        }
      }
    }
  }, [onLoginSuccess]);

  function checkExpired(date) {
    const currentDate = Math.floor(Date.now() / 1000);
    return currentDate > date;
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn không reload trang khi submit
    setErrorMessage(""); // Reset lỗi trước khi submit
    try {
      // Gọi API đăng nhập từ adminService
      const response = await adminService.login(formData.username, formData.password);

      // Lưu thông tin đăng nhập vào localStorage
      const userRole = useAuth.getUserRole(response);
      if (userRole === "admin") {
        localStorage.setItem("admin", JSON.stringify(response));

        // Báo hiệu đăng nhập thành công
        onLoginSuccess();
      } else {
        setErrorMessage("Account without administrator rights");
      }

    } catch (error) {
      // Kiểm tra lỗi trả về từ server
      const errorMsg = error.response?.data?.message || "Login failed. Please try again.";
      setErrorMessage(errorMsg); // Hiển thị lỗi
    }
  };
  

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Username:</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}

