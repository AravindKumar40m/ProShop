import { createSlice } from "@reduxjs/toolkit";
import { Update } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cardItems: [], shippingAddress: {}, PaymentMethod: "paypal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cardItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cardItems = state.cardItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cardItems = [...state.cardItems, item];
      }

      return Update(state);
    },
    removeFromCart: (state, action) => {
      state.cardItems = state.cardItems.filter((x) => x._id !== action.payload);

      return Update(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return Update(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return Update(state);
    },
    clearCartItems: (state, action) => {
      state.cardItems = [];
      return Update(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
