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
      state.isLoadingAccount = true;
    },
    [fetchAccountInfo.fulfilled]: (state, action) => {
      state.details = action.payload;
      state.isLoadingAccount = false;
    },
    [fetchAccountInfo.rejected]: (state) => {
      state.isLoadingAccount = false;
    },
    [fetchOrdersInfo.pending]: (state) => {
      state.isLoadingOrders = true;
    },
    [fetchOrdersInfo.fulfilled]: (state, action) => {
      state.orders = action.payload["Orders"];
      state.isLoadingOrders = false;
    },
    [fetchOrdersInfo.rejected]: (state) => {
      state.isLoadingOrders = false;
    }
  }
});

export default accountSlice.reducer;