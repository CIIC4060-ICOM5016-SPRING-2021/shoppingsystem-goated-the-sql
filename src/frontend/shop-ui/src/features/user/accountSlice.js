import {createSlice} from "@reduxjs/toolkit";

import {accountInfo} from "../../dummy-info/dummy-account-info";
import {ordersList} from "../../dummy-info/dummy-orders-info";

const accountSlice = createSlice({
  name: "user",
  initialState: {
    details: accountInfo,
    //TODO: With a get all orders request, this will include the user statistics so adjust accordingly
    orders: ordersList,
    //It is true because the user is fetched at the beginning
    isLoading: true,
  },
  reducers: {}
});

export default accountSlice.reducer;