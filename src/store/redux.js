import { configureStore, createReducer } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authInitialState, authSlice } from "./slices/auth";
import { mainInitialState, mainSlice } from "./slices/main";

const rootReducer = createReducer(
  {
    auth: authInitialState,
    main: mainInitialState,
  },
  {
    [authSlice.name]: authSlice.reducer,
    [mainSlice.name]: mainSlice.reducer,
  }
);

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(loggerMiddleware),
  //   preloadedState,
  devTools: process.env.NODE_ENV !== "production",
  // enhancers: [monitorReducersEnhancer],
});
setupListeners(store.dispatch);

export default store;
