import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const addLikedItem = (userID) => {
  return createAsyncThunk('likes/addLike', () => {
    return fetch(`http://http://127.0.0.1:5000/goated_the_sql/${userID}`)
      .then(res => res.json())
      .catch(err => console.log(err));
  });
}

export const getAllLikes = createAsyncThunk('likes/getAllLikes', (userID) => {
  return fetch(`http://127.0.0.1:5000/goated_the_sql/${userID}/liked_list`);
});

const likesSlice = createSlice({
  name: "likes",
  initialState: {
    items: [],
    //It is true because the likes is fetched at the beginning
    isLoading: true,
  },
  reducers: {
    removeLikedItem(state, action) {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);
      state.items.splice(state.items.indexOf(item), 1);
    },
  },
  extraReducers: {
    [addLikedItem.pending]: (state) => {
      state.isLoading = true;
    },
    [addLikedItem.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.isLoading = false;
    },
    [addLikedItem.rejected]: (state) => {
      state.isLoading = false;
    },

    [getAllLikes.pending]: (state) => {
      console.log("Loading likes");
      state.isLoading = true;
    },
    [getAllLikes.fulfilled]: (state, action) => {
      console.log("Likes loaded");
      //if action.payload is not a Response type
      if (!(action.payload instanceof Response)) {
        state.items = action.payload;
      }
      state.isLoading = false;
    },
    [getAllLikes.rejected]: (state) => {
      console.log("Likes loading failed");
      state.isLoading = false;
    }
  }
});
export const {removeLikedItem} = likesSlice.actions;
export default likesSlice.reducer;