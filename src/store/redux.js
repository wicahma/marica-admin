import { configureStore, createReducer } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authInitialState, authSlice } from "./slices/auth";
import { mainInitialState, mainSlice } from "./slices/main";
import { tableInitialState, tableSlice } from "./slices/table";
import { authLogin } from "./actions";

// { ...authSlice.reducer, ...tableSlice.reducer, ...mainSlice.reducer },
// { ...authSlice.actions, ...tableSlice.actions, ...mainSlice.actions }
const rootReducer = createReducer(
  {
    auth: authInitialState,
    main: mainInitialState,
    table: tableInitialState,
  },
  (builder) => {
    builder
      .addCase(authLogin.pending, (state, action) => {
        state.main.loading = true;
        console.log("action pending", action);
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.main.alert = {
          type: "success",
          message: `Login berhasil, selamat datang ${action.payload.data.nama}!`,
          show: true,
        };
        state.main.loading = false;
        state.auth.adminData = action.payload.data;
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.main.alert = {
          type: "error",
          message: `Login gagal, ${action.error.message}!`,
          show: true,
        };
        console.log("state", state);
        console.log("action", action);
        state.main.loading = false;
      });
    builder.addMatcher(
      (action) =>
        action.type.startsWith("main") ||
        action.type.startsWith("table") ||
        action.type.startsWith("auth"),
      (state, action) => {
        state.main = mainSlice.reducer(state.main, action);
        state.table = tableSlice.reducer(state.table, action);
        state.auth = authSlice.reducer(state.auth, action);
      }
    );
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
