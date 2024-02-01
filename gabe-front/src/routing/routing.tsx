import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Login } from "../pages/auth/Login";
import { AuthLayout } from "../components/Layout/AuthLayout";
import { Signup } from "../pages/auth/Signup";
import { Home } from "../pages/home";

export const Routing:FC = () => {
    return (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route
                  index
                  element={
                    <Home />
                  }
                />
                </Route>
                <Route path="/auth" element={<AuthLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                </Route>
              
            </Routes>
          </BrowserRouter>
    )
}