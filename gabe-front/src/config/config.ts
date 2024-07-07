import axios from "axios";
export const CHAT_AXIOS = axios.create({
  timeout: 20000,
  baseURL: "http://localhost:3000/api",
});


export const AUTH_AXIOS = axios.create({
  timeout: 20000,
  baseURL: "http://localhost:8080/api",
});