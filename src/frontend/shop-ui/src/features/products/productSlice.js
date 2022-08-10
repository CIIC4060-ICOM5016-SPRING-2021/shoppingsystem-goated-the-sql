import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const getAllProducts = createAsyncThunk('products/getAllProducts', () => {
  return fetch('http://127.0.0.1:5000/goated_the_sql/products/all')
    .then((response) => response.json())
    .catch((error) =>
      console.log(error));
});

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productsCopy: [],
    //It is true because the products are fetched at the beginning
    isLoading: true,
    modified: false,
  },
  reducers: {
    orderByPriceAsc: (state) => {
      state.products["Products"].sort((a, b) => a.price - b.price);
    },
    orderByPriceDesc: (state) => {
      state.products["Products"].sort((a, b) => b.price - a.price);
    },
    filterByCat: (state, action) => {
      if (action.payload.value === "all") {
        state.products["Products"] = state.productsCopy;
        state.modified = false;
      } else {
        if (state.modified === false) {
          state.products["Products"] = state.products["Products"].filter((product) => product.category.toLowerCase() === action.payload.value);
          state.modified = true;
        } else {
          state.products["Products"] = state.productsCopy;
          state.products["Products"] = state.products["Products"].filter((product) => product.category.toLowerCase() === action.payload.value);
        }
      }
    },
  },
  extraReducers: {
    [getAllProducts.pending]: (state) => {
      console.log("Loading products");
      state.isLoading = true;
    },
    [getAllProducts.fulfilled]: (state, action) => {
      console.log("Products loaded");
      state.products = action.payload;
      state.productsCopy = action.payload["Products"];
      state.isLoading = false;
    },
    [getAllProducts.rejected]: (state) => {
      console.log("Products loading failed");
      state.isLoading = false;
    }
  }
});

export const {orderByPriceAsc, orderByPriceDesc, filterByCat} = productSlice.actions;
export default productSlice.reducer;