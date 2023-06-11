import { seriesData, userData, videoData } from "../actions";

export const tableBuilder = (builder) => {
  builder
    .addCase(userData.pending, (state, action) => {
      state.main.loading = true;
      console.log("action pending", action);
    })
    .addCase(userData.fulfilled, (state, action) => {
      state.main.loading = false;
      state.table.user = action.payload.data;
    })
    .addCase(userData.rejected, (state, action) => {
      state.main.loading = false;
      state.main.alert = {
        type: "error",
        message: `Fetching data gagal, ${action.error.message}!`,
        show: true,
      };
      console.log("state", state);
      console.log("action", action);
    });

  builder
    .addCase(videoData.pending, (state, action) => {
      state.main.loading = true;
      console.log("action pending", action);
    })
    .addCase(videoData.fulfilled, (state, action) => {
      state.main.loading = false;
      state.table.video = action.payload.data;
    })
    .addCase(videoData.rejected, (state, action) => {
      state.main.loading = false;
      state.main.alert = {
        type: "error",
        message: `Fetching data gagal, ${action.error.message}!`,
        show: true,
      };
      console.log("state", state);
      console.log("action", action);
    });

  builder
    .addCase(seriesData.pending, (state, action) => {
      state.main.loading = true;
      console.log("action pending", action);
    })
    .addCase(seriesData.fulfilled, (state, action) => {
      state.main.loading = false;
      state.table.series = action.payload.data;
    })
    .addCase(seriesData.rejected, (state, action) => {
      state.main.loading = false;
      state.main.alert = {
        type: "error",
        message: `Fetching data gagal, ${action.error.message}!`,
        show: true,
      };
      console.log("state", state);
      console.log("action", action);
    });

  return builder;
};
