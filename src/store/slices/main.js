import { createSlice } from "@reduxjs/toolkit";

export const mainInitialState = {
  loading: false,
  alert: {
    type: "info",
    message: "Message belum diatur!",
    show: false,
  },
};

export const mainSlice = createSlice({
  name: "main",
  initialState: mainInitialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setAlert: (state, action) => {
      state.alert = action.payload;
    },
  },
});

const { actions, reducer } = mainSlice;

export const { setLoading, setAlert } = actions;

export default reducer;
