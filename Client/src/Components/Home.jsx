import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ImageSlider from "./ImageSlider";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Products from "./Products";
import { getAllProductsAction } from "../Actions/ProductAction";
import { setProducts } from "../Redux/reducers/products";
import { enqueueSnackbar } from "notistack";
import { setUser } from "../Redux/reducers/user";
import { getCartAction } from "../Actions/CartAction";
import { setCart } from "../Redux/reducers/cart";
import { getAllOrdersAction } from "../Actions/OrderAction";
import { setOrders } from "../Redux/reducers/orders";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const storedToken = localStorage.getItem("token");
  const token = storedToken ? JSON.parse(storedToken) : null;

  const setUserData = () => {
    const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : null;
    dispatch(setUser(userData));
  };
  // get all products function
  const getAllProducts = async () => {
    const response = await getAllProductsAction();
    if (response.status) {
      dispatch(setProducts(response.data));
    } else if (response.error) {
      if (response.statusCode == 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        enqueueSnackbar(response.message, { variant: "error" });
        dispatch(setCart([]));
        navigate("/login");
      } else {
        enqueueSnackbar(response.message, { variant: "error" });
      }
    }
  };
  // get all cart function
  const getCart = async () => {
    const response = await getCartAction(user?.userId);
    console.log(true);
    if (response.status) {
      dispatch(setCart(response.data));
    } else if (response.error) {
      dispatch(setCart([]));
    }
  };

  // get all orders function
  const getOrders = async () => {
    const response = await getAllOrdersAction(user?.userId);
    if (response.status) {
      dispatch(setOrders(response.data));
    } else if (response.error) {
      dispatch(setOrders([]));
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    getAllProducts();
    setUserData();
  }, []);

  useEffect(() => {
    if (user?.userId) {
      getCart();
      getOrders();
    }
  }, [user]);
  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <ImageSlider />
        <Products />
      </div>
      <Footer />
    </>
  );
};

export default Home;
