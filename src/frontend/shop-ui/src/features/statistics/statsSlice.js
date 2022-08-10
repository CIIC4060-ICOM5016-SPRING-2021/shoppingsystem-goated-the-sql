import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {globalStats} from "../../dummy-info/dummy-global-stats";
import {accountStats} from "../../dummy-info/dummy-account-stats";

export const fetchGlobalStats = createAsyncThunk( 'stats/fetchGlobalStats', async () => {
  return fetch('http://');
});
export const fetchAccountStats = createAsyncThunk( 'stats/fetchAccountStats', async () => {
 return fetch('http://');
});

const statsSlice = createSlice({
  name: "stats",
  initialState: {
    globalStats: globalStats,
    accountStats: accountStats,
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [fetchGlobalStats.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchGlobalStats.fulfilled]: (state, action) => {
      state.globalStats = action.payload;
      state.isLoading = false;
    },
    [fetchGlobalStats.rejected]: (state) => {
      state.isLoading = false;
    },
    [fetchAccountStats.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchAccountStats.fulfilled]: (state, action) => {
      state.accountStats = action.payload;
      state.isLoading = false;
    },
    [fetchAccountStats.rejected]: (state) => {
      state.isLoading = false;
    }
  }
});

export default statsSlice.reducer;