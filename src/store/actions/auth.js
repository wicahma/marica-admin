import { createAsyncThunk } from "@reduxjs/toolkit";

export const authLogin = createAsyncThunk(
  "auth/setAdminData",
  async (value, thunkAPI) => {
    console.log(value);
    console.log(thunkAPI);
    const res = await axios.post("/login", value);

    return res.data;
  }
);

export default {
  authLogin,
};
