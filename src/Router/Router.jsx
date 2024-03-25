import React, { useContext, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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
import ProductVendor from "../components/ProductVendor/ProductVendor";
import Payment from "../components/Payment/Payment";
import Favorite from "../components/Favorite/Favorite";
import ChangePassword from "../components/ChangePassword/ChangePassword";
import RatingProduct from "../components/Rating/Rating";
import NewProduct from "../components/NewsProduct/NewPoduct";
import ForgetPassword from "../components/ForgetPassword/ForgetPassword";
import ResetCode from "../components/ResetCode/ResetCode";
import ResetPassword from "../components/ResetPassword/ResetPassword";
import AllComment from "../components/AllComment/AllComment";
// import ChangePassword from "../components/ChangePassword/ChangPassword";
import { CartContext } from "../Context/CartContext.js";
import { toast } from 'react-toastify';
import OrderHistory from "../components/OrderHistory/OrderHistory.jsx";
import AdminPanel from "../components/Admin/AdminPanel/AdminPanel.jsx";
import ProtectedAdmin from "../components/ProtectedRoutes/ProtectedAdmin.js";
import AdminCategory from "../components/Admin/AdminCategory/AdminCategory.jsx";
import LayoutAdmin from "../components/Admin/Layout/Layout.jsx";
import UpdateCategory from "../components/Admin/UpdateCategory/UpdateCategory.jsx";
import AddCategory from "../components/Admin/AddCategory/AddCategory.jsx";
import AdminSubCategory from "../components/Admin/AdminSubCategory/AdminSubCategory.jsx";
import AdminUser from "../components/Admin/AdminUser/AdminUser.jsx";
import AdminProduct from "../components/Admin/AdminProduct/AdminProduct.jsx";
import AddSubCategory from "../components/Admin/AddSubCategory/AddSubCategory.jsx";
import UpdateSubCategory from "../components/Admin/UpdateSubCategory/UpdateSubCategory.jsx";




export default function Router() {

  const { handle_payment_success } = useContext(CartContext)
  const location = useLocation();




  useEffect(() => {
    if (location.pathname === "/handle-payment-success/") {
      toast.success("your order is confirmed", {
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          background: "white",
          color: "black",
          borderRadius: "5px",
          textAlign: "center",
          // Center the toast notification
          position: "fixed",
          top: "5%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      });

      // clearCart(); 
      handle_payment_success()
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            // <ProtectedRoutes>
            <Home />
            // </ProtectedRoutes>
          }
        />

        <Route
          path="/home"
          element={
            // <ProtectedRoutes>
            <Home />
            // </ProtectedRoutes>
          }
        />
        <Route
          path="/about"
          element={
            // <ProtectedRoutes>
            <About />
            // </ProtectedRoutes>
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
          path="/changePassword"
          element={
            <ProtectedRoutes>
              <ChangePassword />
            </ProtectedRoutes>
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
          path="/forgetPassword"
          element={
            <ProtectedLogin>
              <ForgetPassword />
            </ProtectedLogin>
          }
        />
        <Route
          path="/resetCode"
          element={
            <ProtectedLogin>
              <ResetCode />
            </ProtectedLogin>
          }
        />

        <Route
          path="/resetPassword"
          element={
            <ProtectedLogin>
              <ResetPassword />
            </ProtectedLogin>
          }
        />

        <Route
          path="/detail/:id"
          element={
            // <ProtectedRoutes>
            <ProductDetail />
            // </ProtectedRoutes>
          }
        />
        <Route
          path="/newproduct"
          element={
            // <ProtectedRoutes>
            <NewProduct />
            // </ProtectedRoutes>
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
          path="/vendorProduct/:vendorid/:shopname"
          element={
            <ProtectedRoutes>
              <ProductVendor />
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
          path="/rateProduct/:id/:prodName"
          element={
            <ProtectedRoutes>
              <ProtectedCustomer>
                <RatingProduct />
              </ProtectedCustomer>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/comment/:id/:prodName"
          element={
            // <ProtectedRoutes>
            <AllComment />
            // </ProtectedRoutes>
          }
        />

        <Route
          path="/favorite"
          element={
            <ProtectedRoutes>
              <ProtectedCustomer>
                <Favorite />
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
          path="/orderHistory"
          element={
            <ProtectedRoutes>
              <ProtectedCustomer>
                <OrderHistory />
              </ProtectedCustomer>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoutes>
              <ProtectedCustomer>
                <Payment />
              </ProtectedCustomer>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/handle-payment-success"
          element={
            <ProtectedRoutes>
              <ProtectedCustomer>
                <Home />
              </ProtectedCustomer>
            </ProtectedRoutes>
          }
        />

        <Route
          path="/category"
          element={
            // <ProtectedRoutes>
            <Category />
            // </ProtectedRoutes>
          }
        />
        <Route
          path="/subcategory/:categoryId/:categoryName"
          element={
            // <ProtectedRoutes>
            <SubCategory />
            // </ProtectedRoutes>
          }
        />
        <Route
          path="/productinsubcategory/:categoryId/:categoryName/:subCategoryId/:subCategoryName"
          element={
            // <ProtectedRoutes>
            <ProductINSubCategory />
            // </ProtectedRoutes>
          }
        />
        <Route
          path="/allProduct"
          element={
            <ProtectedRoutes>
              <ProtectedVendor>
                <FeatureProduct />
              </ProtectedVendor>
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
              <NotFound />
            </ProtectedRoutes>
          }
        />
      </Route>
      <Route element={<AdminPanel />}>
        <Route
          path="/adminPanel"
          element={
            <ProtectedRoutes>
              <ProtectedAdmin>
                <AdminPanel />
              </ProtectedAdmin>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/adminPanel/adminCategory"
          element={
            <ProtectedRoutes>
              <ProtectedAdmin>
                <AdminCategory />
              </ProtectedAdmin>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/adminPanel/adminCategory/updateCategory/:id"
          element={
            <ProtectedRoutes>
              <ProtectedAdmin>
                <UpdateCategory />
              </ProtectedAdmin>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/adminPanel/adminCategory/addCategory"
          element={
            <ProtectedRoutes>
              <ProtectedAdmin>
                <AddCategory />
              </ProtectedAdmin>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/adminPanel/adminSubCategory"
          element={
            <ProtectedRoutes>
              <ProtectedAdmin>
                <AdminSubCategory />
              </ProtectedAdmin>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/adminPanel/adminSubCategory/addSubCategory"
          element={
            <ProtectedRoutes>
              <ProtectedAdmin>
                <AddSubCategory />
              </ProtectedAdmin>
            </ProtectedRoutes>
          }
        />

        <Route
          path="/adminPanel/adminSubCategory/updateSubCategory/:id"
          element={
            <ProtectedRoutes>
              <ProtectedAdmin>
                <UpdateSubCategory />
              </ProtectedAdmin>
            </ProtectedRoutes>
          }
        />

        <Route
          path="/adminPanel/adminUser"
          element={
            <ProtectedRoutes>
              <ProtectedAdmin>
                <AdminUser />
              </ProtectedAdmin>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/adminPanel/adminProduct"
          element={
            <ProtectedRoutes>
              <ProtectedAdmin>
                <AdminProduct />
              </ProtectedAdmin>
            </ProtectedRoutes>
          }
        />
      </Route>
    </Routes>
  );
}
