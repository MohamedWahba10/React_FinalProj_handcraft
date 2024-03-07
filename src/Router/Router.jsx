import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../components/Home/Home";
import About from "../components/About/About";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import ProtectedRoutes from "../components/ProtectedRoutes/ProtectedRoutes";
import Profile from "../components/Profile/Profile";
import UpdateProfile from "../components/UpdateProfile/UpdateProfile";
import AddProduct from "../components/AddProduct/AddProduct";
import ProtectedLogin from "../components/ProtectedRoutes/ProtectedLogin";
import Cart from  "../components/Cart/Cart"

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
        <Route path="/login" element={
          <ProtectedLogin>
            <Login />
          </ProtectedLogin>

        } />
        <Route path="/register" element={
          <ProtectedLogin>
            <Register />
          </ProtectedLogin>
        } />
        <Route path="/verify-email" element={
          <ProtectedLogin>
            <Login />
          </ProtectedLogin>

        } />
        <Route
          path="/detail"
          element={
            <ProtectedRoutes>
              <ProductDetail />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/updateProfile"
          element={
            <ProtectedRoutes>
              <UpdateProfile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/addProduct"
          element={
            <ProtectedRoutes>
              <AddProduct />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          }
        />

      </Route>




    </Routes>
  );
}

