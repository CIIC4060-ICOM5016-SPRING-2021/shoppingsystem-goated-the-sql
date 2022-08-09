import {createSlice} from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    //It is true because the products are fetched at the beginning
    isLoading: true,
  },
  reducers: {}
});

export default productSlice.reducer;