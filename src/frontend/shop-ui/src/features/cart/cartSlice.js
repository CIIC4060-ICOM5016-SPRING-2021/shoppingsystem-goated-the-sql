import {createSlice} from "@reduxjs/toolkit";

import {cart} from "../../dummy-info/dummy-cart-info";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: cart,
    total: 0,
    //It is true because the cart is fetched at the beginning
    isLoading: false,
  },
  reducers: {
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.total = 0;
    }
  }
});

export const {setTotal, clearCart} = cartSlice.actions;
export default cartSlice.reducer;