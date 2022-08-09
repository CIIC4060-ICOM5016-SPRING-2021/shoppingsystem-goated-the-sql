import {createSlice} from "@reduxjs/toolkit";

import {globalStats} from "../../dummy-info/dummy-global-stats";
import {accountStats} from "../../dummy-info/dummy-account-stats";

const statsSlice = createSlice({
  name: "stats",
  initialState: {
    globalStats: globalStats,
    accountStats: accountStats,
  },
  reducers: {},
});

export default statsSlice.reducer;