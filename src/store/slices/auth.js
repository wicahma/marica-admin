import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
});

export const {} = authSlice.actions;

export default authSlice.reducer;
