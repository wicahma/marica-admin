import { createSlice } from "@reduxjs/toolkit";

export const authInitialState = {
  adminData: {},
  adminToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    setAdminData: (state, action) => {
      state.adminData = action.payload;
    },

    setAdminToken: (state, action) => {
      state.adminToken = action.payload;
    },
  },
});

export const { setAdminData, setAdminToken } = authSlice.actions;

export default authSlice.reducer;
