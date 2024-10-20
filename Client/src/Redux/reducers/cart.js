import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  cartCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.cart = action.payload;
      console.log("cart =", action.payload);

      // set cart count when the cart state is updated
      state.cartCount = state.cart?.length > 0 ? state.cart?.length : 0;
      console.log("cart count =", state.cart?.length);
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
