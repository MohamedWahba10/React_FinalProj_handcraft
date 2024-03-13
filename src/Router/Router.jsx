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
import Cart from "../components/Cart/Cart";
import UpdateProduct from "../components/UpdateProduct/UpdateProduct";
import Checkout from "../components/Checkout/Checkout";
import FeatureProduct from "../components/FeatureProduct/FeatureProduct";
import Category from "../components/Category/Category";
import SubCategory from "../components/SubCategory/SubCategory";
import ProtectedVendor from "../components/ProtectedRoutes/ProtectedVendor";
import ProtectedCustomer from "../components/ProtectedRoutes/ProtectedCustomer";
import ProductINSubCategory from "../components/ProductINSubCategory/ProductINSubCategory";
import NotFound from "../components/NotFound/NotFound";

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
        <Route
          path="/login"
          element={
            <ProtectedLogin>
              <Login />
            </ProtectedLogin>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedLogin>
              <Register />
            </ProtectedLogin>
          }
        />

        <Route
          path="/detail/:id"
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
              <ProtectedVendor>
                <AddProduct />
              </ProtectedVendor>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoutes>
              <ProtectedCustomer>
                <Cart />
              </ProtectedCustomer>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoutes>
              <ProtectedCustomer>
                <Checkout />
              </ProtectedCustomer>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/category"
          element={
            <ProtectedRoutes>
              <Category />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/subcategory/:categoryId/:categoryName"
          element={
            <ProtectedRoutes>
              <SubCategory />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/productinsubcategory/:categoryId/:categoryName/:subCategoryId/:subCategoryName"
          element={
            <ProtectedRoutes>
              <ProductINSubCategory />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/allProduct"
          element={
            <ProtectedRoutes>
              <FeatureProduct />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/updateProduct/:id"
          element={
            <ProtectedRoutes>
              <ProtectedVendor>
                <UpdateProduct />
              </ProtectedVendor>
            </ProtectedRoutes>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoutes>
              <NotFound/>
            </ProtectedRoutes>
          }
        />
      </Route>
    </Routes>
  );
}
