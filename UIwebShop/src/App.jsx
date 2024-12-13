import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';

import Login from './components/login/login';
import Cart from './components/cart/cart';
import Home from './pages/home/home';
import Product from './pages/product/product';
import { useState } from 'react';
import Contact from './pages/contact/contact';
import Policy from './pages/policy/policy';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);

  const openLoginPopup = () => {
    setIsLoginOpen(true);
  };

  const closeLoginPopup = () => {
    setIsLoginOpen(false);
  };

  const openCartPopup = () => {
    setCartOpen(true);
  };

  const closeCartPopup = () => {
    setCartOpen(false);
  };

  return (
    <>
      <Router>
        <Header openLoginPopup={openLoginPopup} openCartPopup={openCartPopup} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product" element={<Product />} />
          <Route exact path="/policy" element={<Policy />} />
          <Route exact path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
      {isLoginOpen && <Login closePopup={closeLoginPopup} />}
      {isCartOpen && <Cart closePopup={closeCartPopup} />}
    </>
  );
}

export default App;
