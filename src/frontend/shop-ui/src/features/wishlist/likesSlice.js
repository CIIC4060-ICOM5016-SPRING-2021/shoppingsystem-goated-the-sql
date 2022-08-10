import {createSlice} from "@reduxjs/toolkit";

import {likes} from "../../dummy-info/dummy-likes-info";

const likesSlice = createSlice({
  name: "likes",
  initialState: {
    items: likes,
    //It is true because the wishlist is fetched at the beginning
    isLoading: false,
  },
  reducers: {
    removeLikedItem(state, action) {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);
      state.items.splice(state.items.indexOf(item), 1);
    },
    addLikedItem(state, action) {
      const item = action.payload;
      state.items.push(item);
    }
  }
});
export const {removeLikedItem} = likesSlice.actions;
export default likesSlice.reducer;