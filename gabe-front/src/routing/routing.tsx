import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout";

export const Routing:FC = () => {
    return (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route
                  index
                  element={
                    <h1>Home</h1>
                  }
                />
                <Route path="login" element={<h1>login</h1>} />
              </Route>
            </Routes>
          </BrowserRouter>
    )
}