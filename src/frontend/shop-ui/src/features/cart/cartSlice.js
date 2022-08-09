import {createSlice} from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    total: 0,
    //It is true because the cart is fetched at the beginning
    isLoading: true,
  },
  reducers: {}
});

export default cartSlice.reducer;