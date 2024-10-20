import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductDetail from "./Components/ProductDetail";
import Cart from "./Components/Cart";
import OrderSuccess from "./Components/OrderSuccess";
import Orders from "./Components/Orders";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          Component={Login} // Login page
        />
        <Route
          path="/register"
          Component={Register} // Register page
        />
        <Route
          path="/"
          Component={Home} // Home page
        />
        <Route
          path="/productDetail"
          Component={ProductDetail} // Product detail page
        />
        <Route
          path="/cart"
          Component={Cart} // Cart products list page 
        />
        <Route
          path="/orderSuccess"
          Component={OrderSuccess} // Order success page
        />
        <Route
          path="/orders"
          Component={Orders} // Orders list page
        />
      </Routes>
    </>
  );
}

export default App;
