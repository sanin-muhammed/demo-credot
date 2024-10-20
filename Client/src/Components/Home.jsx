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

  // Extracting data from Redux
  const { user } = useSelector((state) => state.user);

  // get token from local storage
  const storedToken = localStorage.getItem("token");
  const token = storedToken ? JSON.parse(storedToken) : null;

  // set user data from local storage to the Redux
  const setUserData = () => {
    const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : null;
    dispatch(setUser(userData));
  };

  // get all products function
  const getAllProducts = async () => {
    const response = await getAllProductsAction();
    if (response.status) {
      dispatch(setProducts(response.data)); // set products to redux state
    } else if (response.error) {
      if (response.statusCode == 401) {
        enqueueSnackbar(response.message, { variant: "error" });
        dispatch(setCart([]));
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
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
      dispatch(setCart(response.data)); // set cart data to redux state
    } else if (response.error) {
      dispatch(setCart([]));
    }
  };

  // get all orders function
  const getOrders = async () => {
    const response = await getAllOrdersAction(user?.userId);
    if (response.status) {
      dispatch(setOrders(response.data)); // set orders to redux state
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
      {/* navbar component */}
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* image slider component */}
        <ImageSlider />
        {/* product list component */}
        <Products />
      </div>
      {/* footer component */}
      <Footer />
    </>
  );
};

export default Home;
