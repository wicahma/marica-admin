import axios from "axios";
export * from "./auth";
export * from "./table";

axios.defaults.baseURL = "https://api.marica.id/api/v1";

export default axios;
