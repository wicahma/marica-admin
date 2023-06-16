import { createSlice } from "@reduxjs/toolkit";

export const tableInitialState = {
  user: {
    data: [],
    pages: 1,
    selectedData: {},
  },
  video: {
    data: [],
    pages: 1,
    selectedData: {},
  },
  series: {
    data: [],
    pages: 1,
    selectedData: {},
  },
  payment: {
    balance: "",
    data: [],
    pages: 1,
  },
};

export const tableSlice = createSlice({
  name: "table",
  initialState: tableInitialState,
  reducers: {
    setUser: (state, action) => {
      state.user.data = action.payload;
    },

    setVideo: (state, action) => {
      state.video.data = action.payload;
    },

    setPaymentData: (state, action) => {
      state.payment.data = action.payload;
    },

    setSeries: (state, action) => {
      state.series.data = action.payload;
    },

    setPaymentBalance: (state, action) => {
      state.payment.balance = action.payload;
    },

    setSelectedData: (state, action) => {
      state[action.payload.type].selectedData = action.payload.data;
    },
  },
});

const { actions, reducer } = tableSlice;

export const {
  setPayment,
  setUser,
  setVideo,
  setSeries,
  setPaymentBalance,
  setSelectedData,
} = actions;

export default reducer;
