import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const authLogin = createAsyncThunk(
  "fetch/login",
  async (value, thunkAPI) => {
    const res = await axios.post("/user/login", value);
    return res.data;
  }
);

export default {
  authLogin,
};
