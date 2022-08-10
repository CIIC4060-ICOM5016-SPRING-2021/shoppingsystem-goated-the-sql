import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {products} from "../../dummy-info/dummy-products";

export const getAllProducts = createAsyncThunk('products/getAllProducts', () => {
  return fetch('http://127.0.0.1:5000/goated_the_sql/products/all')
    .then((response) => response.json())
    .catch((error) =>
      console.log(error));
});

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: products,
    //It is true because the products are fetched at the beginning
    //TODO: Change this to true when the products are fetched logic is implemented
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [getAllProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllProducts.fulfilled]: (state, action) => {
      console.log('The products have been fetched: ' + action)
      state.products = action.payload;
      state.isLoading = false;
    },
    [getAllProducts.rejected]: (state) => {
      state.isLoading = false;
    }
  }
});

export default productSlice.reducer;