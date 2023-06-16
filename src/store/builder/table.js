import { pageDivider } from "@/context/table/pagination";
import {
  getBalance,
  paymentData,
  seriesData,
  userData,
  videoData,
} from "../actions";

export const tableBuilder = (builder) => {
  builder
    .addCase(userData.pending, (state, action) => {
      state.main.loading = true;
    })
    .addCase(userData.fulfilled, (state, action) => {
      state.main.loading = false;
      const pagesData = pageDivider(action.payload.data);
      state.table.user.data = pagesData.data;
      state.table.user.pages = pagesData.pages;
    })
    .addCase(userData.rejected, (state, action) => {
      state.main.loading = false;
      state.main.alert = {
        type: "error",
        message: `Fetching data gagal, ${action.error.message}!`,
        show: true,
      };
    });

  builder
    .addCase(videoData.pending, (state, action) => {
      state.main.loading = true;
    })
    .addCase(videoData.fulfilled, (state, action) => {
      state.main.loading = false;
      const pagesData = pageDivider(action.payload.data);
      state.table.video.data = pagesData.data;
      state.table.video.pages = pagesData.pages;
    })
    .addCase(videoData.rejected, (state, action) => {
      state.main.loading = false;
      state.main.alert = {
        type: "error",
        message: `Fetching data gagal, ${action.error.message}!`,
        show: true,
      };
    });

  builder
    .addCase(seriesData.pending, (state, action) => {
      state.main.loading = true;
    })
    .addCase(seriesData.fulfilled, (state, action) => {
      state.main.loading = false;
      const pagesData = pageDivider(action.payload.data);
      state.table.series.data = pagesData.data;
      state.table.series.pages = pagesData.pages;
    })
    .addCase(seriesData.rejected, (state, action) => {
      state.main.loading = false;
      state.main.alert = {
        type: "error",
        message: `Fetching data gagal, ${action.error.message}!`,
        show: true,
      };
    });

  builder
    .addCase(paymentData.pending, (state, action) => {
      state.main.loading = true;
    })
    .addCase(paymentData.fulfilled, (state, action) => {
      state.main.loading = false;
      const pagesData = pageDivider(action.payload.data);
      state.table.payment.data = pagesData.data;
      state.table.payment.pages = pagesData.pages;
    })
    .addCase(paymentData.rejected, (state, action) => {
      state.main.loading = false;
      state.main.alert = {
        type: "error",
        message: `Fetching data gagal, ${action.error.message}!`,
        show: true,
      };
    });

  builder
    .addCase(getBalance.pending, (state, action) => {
      state.main.loading = true;
    })
    .addCase(getBalance.fulfilled, (state, action) => {
      state.main.loading = false;
      state.table.payment.balance = action.payload.data;
    })
    .addCase(getBalance.rejected, (state, action) => {
      state.main.loading = false;
      state.main.alert = {
        type: "error",
        message: `Fetching data Balance gagal, ${action.error.message}!`,
        show: true,
      };
    });

  return builder;
};
