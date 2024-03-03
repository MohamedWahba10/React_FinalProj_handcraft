import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../components/Home/Home";
import About from "../components/About/About";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import ProtectedRoutes from "../components/ProtectedRoutes/ProtectedRoutes";
import ActivateAccount from "../components/ActivateAccount/ActivateAccount";




export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoutes>
              <About />
            </ProtectedRoutes>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
     
        <Route path="/activate" element={<Login />} />

        <Route path="/detail"
          element={
            <ProtectedRoutes>
              <ProductDetail />
            </ProtectedRoutes>
          }
        />
      </Route>
    </Routes>
  );
}
