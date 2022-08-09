import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    details: {},
    //It is true because the user is fetched at the beginning
    isLoading: true,
  },
  reducers: {}
});

export default userSlice.reducer;