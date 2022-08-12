import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const addLikedItem = createAsyncThunk('likes/addLike', (requiredInfo) => {
  const {product, user_id} = requiredInfo;
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "user_id": user_id,
    })
  }

  return fetch(`http://127.0.0.1:5000/goated_the_sql/product/${product.id}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log(error));
});
export const getAllLikes = createAsyncThunk('likes/getAllLikes', (userID) => {
  return fetch(`http://127.0.0.1:5000/goated_the_sql/${userID}/liked_list`)
    .then(res => res.json())
    .catch(err => console.log(err));
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
    [addLikedItem.pending]: () => {
      console.log("Adding like to item");
    },
    [addLikedItem.fulfilled]: () => {
      console.log("Added like to item");
    },
    [addLikedItem.rejected]: () => {
      console.log("Failed to add like to item");
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