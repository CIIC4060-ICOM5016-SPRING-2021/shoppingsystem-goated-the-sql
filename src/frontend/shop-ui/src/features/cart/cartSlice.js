import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {cart} from "../../dummy-info/dummy-cart-info";

export const getCartItems = createAsyncThunk('cart/getItems', (id) => {
  return fetch(`http://127.0.0.1:5000/goated_the_sql/cart/${id}`)
    .then((response) => response.json())
    .catch((error) =>
      console.log(error));
});

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

      if (cartItem.quantity <= 0) {
        state.cartItems = state.cartItems.filter(cartItem => cartItem.product_id !== action.payload);
      }
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log('The cart has been fetched: ' + action)
      state.cartItems = action.payload;
      state.isLoading = false;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    }
  }
});

export const {setTotal, clearCart, decreaseCartItemQuantity, increaseCartItemQuantity, updateCart} = cartSlice.actions;
export default cartSlice.reducer;