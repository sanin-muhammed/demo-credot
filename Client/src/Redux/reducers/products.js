import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productId: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
      console.log("products =", action.payload);
    },
    setProductId(state, action) {
      state.productId = action.payload;
      console.log("productId =", action.payload);
    },
  },
});

export const { setProducts, setProductId } = productSlice.actions;
export default productSlice.reducer;
