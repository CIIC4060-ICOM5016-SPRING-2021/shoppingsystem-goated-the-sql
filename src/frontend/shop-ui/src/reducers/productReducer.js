import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const getAllProducts = createAsyncThunk('products/getAllProducts', () => {
  return fetch('http://127.0.0.1:5000/goated_the_sql/products/all')
    .then((response) => response.json())
    .catch((error) => 
    console.log(error));
});

const productSlice = createSlice({
  name: 'products',
  initialState: {products: []},
  extraReducers: {
    [getAllProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllProducts.fulfilled]: (state, action) => {
      console.log('The products have been fetched: ' + action)
      state.isLoading = false;
      state.products = action.payload;
    },
    [getAllProducts.rejecteed]: (state) => {
      state.isLoading = false;
    }
  }
})

export default productSlice.reducer;