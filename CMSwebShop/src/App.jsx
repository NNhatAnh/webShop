import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/header/header';
import Sidebar from './component/sidebar/sidebar';
import Footer from './component/footer/footer';

import Product_list from './Pages/Product/product_list';
import Order_list from './Pages/OrderList/order_list';
import Product_add from './Pages/Product/product_add';
import Product_edit from './Pages/Product/product_edit';
import Order_item from './Pages/OrderList/order_item';
import Login from './component/login/login_admin';

function App() {
    // State kiểm tra xem người dùng đã đăng nhập hay chưa
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Hàm xử lý đăng nhập thành công
    const handleLoginSuccess = () => {
      setIsLoggedIn(true);
    };

  return (
    <>
      {!isLoggedIn ? (
        // Nếu chưa đăng nhập, hiển thị form login
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        // Nếu đã đăng nhập, hiển thị giao diện chính
        <Router>
          <Header />
          <Sidebar />
          <Routes>
            <Route exact path="/productList" element={<Product_list />} />
            <Route exact path="/productAdd" element={<Product_add />} />
            <Route exact path="/productEdit/:id" element={<Product_edit />} />
            <Route exact path="/orderList" element={<Order_list />} />
            <Route exact path="/orderItem" element={<Order_item />} />
          </Routes>
          <Footer />
        </Router>
      )}
    </>
  );
}

export default App
