import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userData = createAsyncThunk(
  "fetch/get/user",
  async (value, thunkAPI) => {
    // console.log(thunkAPI);
    const { getState, dispatch } = thunkAPI;
    const res = await axios({
      method: "GET",
      url: "/user/all",
      data: value,
      headers: {
        Authorization: `Bearer ${getState().auth.adminToken}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const videoData = createAsyncThunk(
  "fetch/get/video",
  async (value, thunkAPI) => {
    const { getState, dispatch } = thunkAPI;
    const res = await axios({
      method: "GET",
      url: "/video/all",
      data: value,
      headers: {
        Authorization: `Bearer ${getState().auth.adminToken}`,
      },
    });
    return res.data;
  }
);

export const seriesData = createAsyncThunk(
  "fetch/get/series",
  async (value, thunkAPI) => {
    // console.log(thunkAPI);``
    const { getState, dispatch } = thunkAPI;
    const res = await axios({
      method: "GET",
      url: "/series/all",
      data: value,
      headers: {
        Authorization: `Bearer ${getState().auth.adminToken}`,
      },
    });
    return res.data;
  }
);

export default {
  userData,
  videoData,
  seriesData,
};