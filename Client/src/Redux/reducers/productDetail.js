import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {},
};

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    setProduct(state, action) {
      state.product = action.payload;

      console.log("product =", action.payload);
    },
    
  },
});

export const { setProduct } = productDetailSlice.actions;
export default productDetailSlice.reducer;
