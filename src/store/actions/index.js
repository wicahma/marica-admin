import axios from "axios";
export * from "./auth";

axios.defaults.baseURL = "http://localhost:4000/api/v1";

export default axios;
