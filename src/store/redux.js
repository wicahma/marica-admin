import { configureStore, createReducer } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authInitialState, authSlice } from "./slices/auth";
import { mainInitialState, mainSlice } from "./slices/main";
import { tableInitialState, tableSlice } from "./slices/table";
import { authLogin } from "./actions";
import { throttle } from "lodash";
import { useRoutes } from "react-router-dom";
import { builderContext } from "./builder";

// NOTE - For load state to local storage / session storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    // console.log("serializedState - load", serializedState);
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
    // console.log("serializedState - save", serializedState);
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
    builderContext(builder);

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
  // enhancers: [monitorReducersEnhancer],
  devTools: process.env.NODE_ENV !== "production",
});
setupListeners(store.dispatch);

store.subscribe(
  throttle(() => {
    console.log("Data saved to local storage!");
    saveState(store.getState());
  }, 1000)
);

export default store;
