import { configureStore } from "@reduxjs/toolkit";

// Import reducers
import productsReducer from "./reducers/products";
import productDetailReducer from "./reducers/productDetail";
import userReducer from "./reducers/user";
import cartReducer from "./reducers/cart";
import orderReducer from "./reducers/orders";

const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetail: productDetailReducer,
    user: userReducer,
    cart: cartReducer,
    orders: orderReducer,
  },
});

export default store;
