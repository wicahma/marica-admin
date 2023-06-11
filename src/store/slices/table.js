import { createSlice } from "@reduxjs/toolkit";

export const tableInitialState = {
  user: [],
  video: [],
  series: [],
  payment: [],
};

export const tableSlice = createSlice({
  name: "table",
  initialState: tableInitialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setVideo: (state, action) => {
      state.video = action.payload;
    },

    setPayment: (state, action) => {
      state.payment = action.payload;
    },

    setSeries: (state, action) => {
      state.series = action.payload;
    },
  },
});

const { actions, reducer } = tableSlice;

export const { setPayment, setUser, setVideo, setSeries } = actions;

export default reducer;
