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
          Component={Login}
        />
        <Route
          path="/register"
          Component={Register}
        />
        <Route
          path="/"
          Component={Home}
        />
        <Route
          path="/productDetail"
          Component={ProductDetail}
        />
        <Route
          path="/cart"
          Component={Cart}
        />
        <Route
          path="/orderSuccess"
          Component={OrderSuccess}
        />
        <Route
          path="/orders"
          Component={Orders}
        />
      </Routes>
    </>
  );
}

export default App;
