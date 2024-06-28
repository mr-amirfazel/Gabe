import axios from "axios";
export const JSONAXIOS = axios.create({
  timeout: 20000,
  baseURL: "http://localhost:3000",
});