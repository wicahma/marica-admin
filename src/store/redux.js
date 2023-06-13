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
    if (serializedState === null) {
      return {
        auth: authInitialState,
        table: tableInitialState,
      };
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return {
      auth: authInitialState,
      table: tableInitialState,
    };
  }
};

// NOTE - For save state to local storage / session storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    // Ignore write errors;
    console.log(e);
  }
};

const persistedState = loadState();

const rootReducer = createReducer(
  // {
  //   auth: persistedState.auth,
  //   main: mainInitialState,
  //   table: persistedState.table,
  // },
  {
    auth: authInitialState,
    main: mainInitialState,
    table: tableInitialState,
  },
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
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

store.subscribe(
  throttle(() => {
    console.log("Data saved to local storage!");
    const { auth, table } = store.getState();
    saveState({ auth, table });
  }, 1000)
);

export default store;
