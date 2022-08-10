import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {accountStats} from "../../dummy-info/dummy-account-stats";

export const fetchGlobalStats = createAsyncThunk('stats/fetchGlobalStats', async () => {
  return fetch('http://')
    .then(res => res.json())
    .catch(err => console.log(err));
});
export const fetchAccountStats = createAsyncThunk('stats/fetchAccountStats', async () => {
  return fetch('http://')
    .then(res => res.json())
    .catch(err => console.log(err));
});

const statsSlice = createSlice({
  name: "stats",
  initialState: {
    globalStats: {},
    accountStats: accountStats,
    isLoadingGlobal: true,
    isLoadingPersonal: true,
  },
  reducers: {
    setAccountStats: (state, action) => {
      if (action.payload !== undefined) {
        console.log("Setting account stats");
        state.accountStats = action.payload;
        state.isLoadingPersonal = false;
      }
    },
    setGlobalStats: (state, action) => {
      console.log("Setting global stats");
      if (action.payload !== undefined) {
        state.globalStats = action.payload;
        state.isLoadingGlobal = false;
      }
    }
  },
  extraReducers: {
    [fetchGlobalStats.pending]: (state) => {
      state.isLoadingGlobal = true;
    },
    [fetchGlobalStats.fulfilled]: (state, action) => {
      state.globalStats = action.payload;
      state.isLoadingGlobal = false;
    },
    [fetchGlobalStats.rejected]: (state) => {
      state.isLoadingGlobal = false;
    },
    [fetchAccountStats.pending]: (state) => {
      state.isLoadingPersonal = true;
    },
    [fetchAccountStats.fulfilled]: (state, action) => {
      state.accountStats = action.payload;
      state.isLoadingPersonal = false;
    },
    [fetchAccountStats.rejected]: (state) => {
      state.isLoadingPersonal = false;
    }
  }
});

export const {setAccountStats, setGlobalStats} = statsSlice.actions;
export default statsSlice.reducer;