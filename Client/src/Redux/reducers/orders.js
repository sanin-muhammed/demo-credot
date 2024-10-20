import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  ordersCount: 0,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
      console.log("orders =", action.payload);

      // set orders count when the orders state is updated
      state.ordersCount = state.orders?.length > 0 ? state.orders?.length : 0;
      console.log("orders count=", state.orders?.length);
    },
  },
});

export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;
