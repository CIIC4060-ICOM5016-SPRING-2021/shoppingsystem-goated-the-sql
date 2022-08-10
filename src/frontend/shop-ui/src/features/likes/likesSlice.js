import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {likes} from "../../dummy-info/dummy-likes-info";

export const addLikedItem = (id) => {
  return createAsyncThunk('likes/addLike', () => {
    return fetch(`http://${id}`);
  });
}

export const getAllLikes = createAsyncThunk('likes/getAllLikes', () => {
  return fetch('http://');
});

const likesSlice = createSlice({
  name: "likes",
  initialState: {
    items: likes,
    //It is true because the likes is fetched at the beginning
    isLoading: false,
  },
  reducers: {
    removeLikedItem(state, action) {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);
      state.items.splice(state.items.indexOf(item), 1);
    },
  },
  extraReducers: {
    [addLikedItem.pending] : (state) => {
      state.isLoading = true;
    },
    [addLikedItem.fulfilled] : (state, action) => {
      state.items.push(action.payload);
      state.isLoading = false;
    },
    [addLikedItem.rejected] : (state) => {
      state.isLoading = false;
    },

    [getAllLikes.pending] : (state) => {
      state.isLoading = true;
    },
    [getAllLikes.fulfilled] : (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    [getAllLikes.rejected] : (state) => {
      state.isLoading = false;
    }
  }
});
export const {removeLikedItem} = likesSlice.actions;
export default likesSlice.reducer;