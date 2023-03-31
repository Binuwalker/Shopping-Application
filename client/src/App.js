import React from "react";
import './styles/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from "./components/footer/Footer";
import TopNav from "./components/header/TopNav";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Cart from "./components/pages/Cart";
import Error from "./components/error/Error";
import ProductDetails from "./components/pages/ProductDetails";

function App() {
  return (
    <div className="app">
      <Router>
        <TopNav />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;