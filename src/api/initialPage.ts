import axios from "../config/axios";

const baseUrl = import.meta.env.VITE_BACKEND_API;

export function initialPageShow() {
  return axios.get(baseUrl + "/config/init-page-status");
}
