import {createSlice} from "@reduxjs/toolkit";

import {wishlist} from "../../dummy-info/dummy-wishlist-info";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: wishlist,
    //It is true because the wishlist is fetched at the beginning
    isLoading: false,
  },
  reducers: {}
});

export default wishlistSlice.reducer;