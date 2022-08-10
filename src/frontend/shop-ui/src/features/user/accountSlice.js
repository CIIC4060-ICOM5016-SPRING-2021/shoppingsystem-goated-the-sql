import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {accountInfo} from "../../dummy-info/dummy-account-info";
import {ordersList} from "../../dummy-info/dummy-orders-info";

export const fetchAccountInfo = createAsyncThunk( 'account/fetchAccountInfo', async () => {
  return fetch('http://');
});

const accountSlice = createSlice({
  name: "user",
  initialState: {
    details: accountInfo,
    //TODO: With a get all orders request, this will include the user statistics so adjust accordingly
    orders: ordersList,
    //It is true because the user is fetched at the beginning
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [fetchAccountInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchAccountInfo.fulfilled]: (state, action) => {
      state.details = action.payload;
      state.isLoading = false;
    },
    [fetchAccountInfo.rejected]: (state) => {
      state.isLoading = false;
    }
  }
});

export default accountSlice.reducer;