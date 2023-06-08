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
  extraReducers(builder) {
    builder
      .addCase(authLogin.pending, (state, action) => {
        console.log("running!");
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        console.log(action);
      })
      .addCase(authLogin.rejected, (state, action) => {
        setAlert({
          type: "error",
          message: "Error pada saat Login",
          show: true,
        });
        console.log(action);
      });
  },
});

export const { setAdminData, setAdminToken } = authSlice.actions;

export default authSlice.reducer;
