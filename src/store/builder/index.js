import { authLogin } from "../actions";
import { tableBuilder } from "./table";

export const builderContext = (builder) => {
  tableBuilder(builder);
  builder
    .addCase(authLogin.pending, (state, action) => {
      state.main.loading = true;
      console.log("action pending", action);
    })
    .addCase(authLogin.fulfilled, (state, action) => {
      if (action.payload.data.userType !== "admin") {
        state.main.alert = {
          type: "error",
          message: `Login gagal, ${action.payload.data.userType} tidak memiliki akses!`,
          show: true,
        };
        state.main.loading = false;
        return;
      }

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
    })
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
