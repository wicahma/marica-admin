import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authSlice } from "./slices/auth";
import { mainSlice } from "./slices/main";

// import monitorReducersEnhancer from "./enhancers/monitorReducers";
// import loggerMiddleware from "./middleware/logger";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [mainSlice.name]: mainSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(loggerMiddleware),
  //   preloadedState,
  devTools: process.env.NODE_ENV !== "production",
  // enhancers: [monitorReducersEnhancer],
});
setupListeners(store.dispatch);

export default store;
