import { createSlice } from "@reduxjs/toolkit";
import { authLogin } from "../actions";
import { setAlert } from "./main";

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
