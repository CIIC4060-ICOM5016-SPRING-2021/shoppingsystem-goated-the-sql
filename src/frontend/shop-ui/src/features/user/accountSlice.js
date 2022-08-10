import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {accountInfo} from "../../dummy-info/dummy-account-info";
import {ordersList} from "../../dummy-info/dummy-orders-info";

export const fetchAccountInfo = createAsyncThunk( 'account/fetchAccountInfo', async (userID) => {
  return fetch(`http://127.0.0.1:5000/goated_the_sql/user/${userID}`)
    .then(res => res.json())
    .catch(err => console.log(err));
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