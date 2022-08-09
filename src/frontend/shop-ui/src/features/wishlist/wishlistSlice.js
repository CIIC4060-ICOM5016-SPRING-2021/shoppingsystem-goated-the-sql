import {createSlice} from "@reduxjs/toolkit";

import {wishlist} from "../../dummy-info/dummy-wishlist-info";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: wishlist,
  },
  reducers: {}
});

export default wishlistSlice.reducer;