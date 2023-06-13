import { authInitialState } from "../slices/auth";
import { mainInitialState } from "../slices/main";
import { tableInitialState } from "../slices/table";
import { authBuilder } from "./auth";
import { tableBuilder } from "./table";

export const builderContext = (builder) => {
  tableBuilder(builder);
  authBuilder(builder);
  builder
    .addMatcher(
      (action) => action === "reset/initialState",
      (state, action) => {
        console.log("-- Data Reseted to Initial State! --");
        state.auth = authInitialState;
        state.main = mainInitialState;
        state.table = tableInitialState;
        state.reset = { isReset: true };
      }
    )
    .addMatcher(
      (action) => action === "reset/localState",
      (state, action) => {
        console.log("-- Data Reseted to Local state! --");
        state.auth = authInitialState;
        state.main = mainInitialState;
        state.table = tableInitialState;
        state.reset = { isReset: false };
      }
    );
};
