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
    clearCart: (state) => {
      state.cartItems = [];
      state.total = 0;
    },
    updateCart: (state, action) => {
      state.cartItems = action.payload;
    },
    increaseCartItemQuantity: (state, action) => {
      const cartItem = state.cartItems.find(cartItem => cartItem.product_id === action.payload);
      cartItem.quantity++;
      state.total += cartItem.product_price;
    },
    decreaseCartItemQuantity: (state, action) => {
      const cartItem = state.cartItems.find(cartItem => cartItem.product_id === action.payload);
      cartItem.quantity--;
      state.total += cartItem.product_price;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
  }
});

export const {setTotal, clearCart, decreaseCartItemQuantity, increaseCartItemQuantity, updateCart} = cartSlice.actions;
export default cartSlice.reducer;