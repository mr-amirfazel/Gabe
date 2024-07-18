import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Login } from "../pages/auth/Login/Login";
import { AuthLayout } from "../components/Layout/AuthLayout";
import { Signup } from "../pages/auth/Signup";
import { Home } from "../pages/home";
import { PrivateRoute } from "../privateRoute";

export const Routing: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
            } />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
