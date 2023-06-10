import { configureStore, createReducer } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authInitialState, authSlice } from "./slices/auth";
import { mainInitialState, mainSlice } from "./slices/main";
import { tableInitialState, tableSlice } from "./slices/table";
import { authLogin } from "./actions";
import { throttle } from "lodash";
import { useRoutes } from "react-router-dom";

// NOTE - For load state to local storage / session storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    console.log("serializedState - load", serializedState);
    if (serializedState === null) {
      return {
        auth: authInitialState,
        main: mainInitialState,
        table: tableInitialState,
      };
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return {
      auth: authInitialState,
      main: mainInitialState,
      table: tableInitialState,
    };
  }
};

// NOTE - For save state to local storage / session storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    console.log("serializedState - save", serializedState);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    // Ignore write errors;
    console.log(e);
  }
};

const persistedState = loadState();

const rootReducer = createReducer(
  {
    auth: persistedState.auth,
    main: persistedState.main,
    table: persistedState.table,
  },
  // {
  //   auth: authInitialState,
  //   main: mainInitialState,
  //   table: tableInitialState,
  // },
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
        state.auth.adminData = {
          _id: action.payload.data._id,
          nama: action.payload.data.nama,
          userType: action.payload.data.userType,
          email: action.payload.data.email,
          imageID: action.payload.data.imageID,
          essentials: {
            username: action.payload.data.essentials.username,
            password: action.payload.data.essentials.password,
            dataBilling: action.payload.data.essentials.dataBilling,
            kidsAnalytics: action.payload.data.essentials.kidsAnalytics,
          },
          validated: action.payload.data.validated,
          provider: action.payload.data.provider,
        };
        state.auth.adminToken = action.payload.data.token;
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
        state.auth = authSlice.reducer(state.auth, action);
        state.main = mainSlice.reducer(state.main, action);
        state.table = tableSlice.reducer(state.table, action);
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

store.subscribe(
  throttle(() => {
    console.log("store.getState()", store.getState());
    saveState(store.getState());
  }, 1000)
);

export default store;
