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
export const updateUserDB = createAsyncThunk('account/updateUserDB', async (requiredInfo) => {
  const {user_id, first_name, last_name, phone_number, password} = requiredInfo;
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      user_to_update_id: user_id,
      first_name: first_name,
      last_name: last_name,
      valid: false,
      password: password,
      phone: phone_number,
      admin: false,
    })
  }

  return fetch(`http://127.0.0.1:5000/goated_the_sql/user/${user_id}`, requestOptions)
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
  reducers: {
    setUserDetails: (state, action) => {
      if (action.payload !== undefined) {
        state.details = action.payload;
        state.isLoadingAccount = false;
      }
    },
    clearUserDetails: (state) => {
      state.details = [];
      state.orders = [];
      state.isLoadingAccount = true;
      state.isLoadingOrders = true;
    }
  },
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
    },
    [updateUserDB.pending]: () => {
      console.log("Updating user");
    },
    [updateUserDB.fulfilled]: () => {
      console.log("User updated");
    },
    [updateUserDB.rejected]: () => {
      console.log("User update failed");
    }
  }
});

export const {setUserDetails, clearUserDetails} = accountSlice.actions;
export default accountSlice.reducer;