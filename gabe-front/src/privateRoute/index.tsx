import React from "react";
import { Navigate } from "react-router-dom";
import { CHAT_AXIOS } from "../config/config";

interface PrivateRouteProps extends React.PropsWithChildren {}
export const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const getToken = sessionStorage.getItem("gabe-token");
  if (getToken) {
    CHAT_AXIOS.defaults.headers.common.Authorization = "Bearer " + getToken;
    return children as JSX.Element;
  }
  return <Navigate to="/auth/login" />;
};