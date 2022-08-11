import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchAccountInfo = createAsyncThunk('account/fetchAccountInfo', async (userID) => {
  return fetch(`http://127.0.0.1:5000/goated_the_sql/user/${userID}`)
    .then(res => res.json())
    .catch(err => console.log(err));
});

export const fetchOrdersInfo = createAsyncThunk('account/fetchOrders', async (userID) => {
  return fetch(`http://127.0.0.1:5000/goated_the_sql/user/${userID}/orders`)
    .then(res => res.json())
    .catch(err => console.log(err));
});

const accountSlice = createSlice({
  name: "user",
  initialState: {
    details: [],
    //TODO: With a get all orders request, this will include the user statistics so adjust accordingly
    orders: [],
    //It is true because the user is fetched at the beginning
    isLoadingAccount: true,
    isLoadingOrders: true,
  },
  reducers: {},
  extraReducers: {
    [fetchAccountInfo.pending]: (state) => {
      console.log("Loading user");
      state.isLoadingAccount = true;
    },
    [fetchAccountInfo.fulfilled]: (state, action) => {
      console.log("User loaded");
      state.details = action.payload;
      state.isLoadingAccount = false;
    },
    [fetchAccountInfo.rejected]: (state) => {
      console.log("User loading failed");
      state.isLoadingAccount = false;
    },
    [fetchOrdersInfo.pending]: (state) => {
      console.log("Loading orders");
      state.isLoadingOrders = true;
    },
    [fetchOrdersInfo.fulfilled]: (state, action) => {
      console.log("Orders loaded");
      state.orders = action.payload;
      state.isLoadingOrders = false;
    },
    [fetchOrdersInfo.rejected]: (state) => {
      console.log("Orders loading failed");
      state.isLoadingOrders = false;
    }
  }
});

export default accountSlice.reducer;