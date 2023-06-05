import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  video: [],
  payment: [],
};

export const tableSlice = createSlice({
  name: "table",
  initialState: initialState,
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

export const { setPayment, setUser, setVideo } = tableSlice.actions;

export default tableSlice.reducer;
