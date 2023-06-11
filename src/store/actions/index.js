import axios from "axios";
export * from "./auth";
export * from "./table";

axios.defaults.baseURL = "http://localhost:4000/api/v1";

export default axios;
