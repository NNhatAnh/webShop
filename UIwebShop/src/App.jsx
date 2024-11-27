import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';

import Home from './pages/home/home';
import Product from './pages/product/product';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product" element={<Product />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
