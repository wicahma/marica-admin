import { createSlice } from "@reduxjs/toolkit";

export const tableInitialState = {
  user: [],
  video: [],
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
  },
});

const { actions, reducer } = tableSlice;

export const { setPayment, setUser, setVideo } = actions;

export default reducer;
