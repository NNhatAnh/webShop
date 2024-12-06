import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';

import Login from './pages/login/login';
import Home from './pages/home/home';
import Product from './pages/product/product';
import { useState } from 'react';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLoginPopup = () => {
    setIsLoginOpen(true);
  };

  const closeLoginPopup = () => {
    setIsLoginOpen(false);
  };

  return (
    <>
      <Router>
        <Header openLoginPopup={openLoginPopup} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product" element={<Product />} />
        </Routes>
        <Footer />
      </Router>
      {isLoginOpen && <Login closePopup={closeLoginPopup} />}
    </>
  );
}

export default App;
