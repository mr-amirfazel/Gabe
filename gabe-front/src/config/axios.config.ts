import axios from "axios";
export const AXIOS = axios.create({
  timeout: 20000,
  baseURL: "http://localhost:8000/api",
});