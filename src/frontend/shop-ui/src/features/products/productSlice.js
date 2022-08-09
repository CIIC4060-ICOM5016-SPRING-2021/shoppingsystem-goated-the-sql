import {createSlice} from "@reduxjs/toolkit";

import {products} from "../../dummy-info/dummy-products";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: products,
    //It is true because the products are fetched at the beginning
    isLoading: true,
  },
  reducers: {}
});

export default productSlice.reducer;