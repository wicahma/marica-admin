import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  alert: {
    type: "info",
    message: "Message belum diatur!",
    show: false,
  },
};

export const mainSlice = createSlice({
  name: "main",
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setAlert: (state, action) => {
      state.alert = action.payload;
    },
  },
});

export const { setLoading, setAlert } = mainSlice.actions;

export default mainSlice.reducer;
