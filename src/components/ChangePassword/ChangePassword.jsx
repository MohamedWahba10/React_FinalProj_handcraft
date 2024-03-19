import React, { useContext, useState } from "react";
import styles from "./ChangePassword.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import axios from "axios";
import { TokenContext } from "../../Context/Token";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function ChangePassword() {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  let navigate = useNavigate();
  let { setToken, setUserData } = useContext(TokenContext);
  async function callChangePassword(reqBody) {
    setError("");
    setisLoading(true);
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/changePassword/`,
        reqBody,{
          headers: {
            Authorization: `Token ${localStorage.getItem("userToken")}`,
          },
        }
      );

      if (response.status === 200) {
        const token = response.data.token;

        if (response.data.message == "password updated successfully") {
          toast.success(response.data.message)
          navigate("/login");

          setisLoading(false);
          localStorage.removeItem("userToken");
          setToken(token);
        } else {
          console.log("data", response.data.message);
        }
      } else {
        console.log("Unexpected response status:", response.status);
      }
    } catch (error) {
      setError("Old password is not valid.");
      setisLoading(false);
      console.error("ErrorChangeeeeeeeeeeee Password", error.response);
    }
  }

  const validationSchema = Yup.object({
    old_password: Yup.string()
      .min(8, "Old Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "'Old Password must be at least 8 characters , letters and digits'"
      )
      .required("Old Password is Required"),
    new_password: Yup.string()
      .min(8, "New Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "'New Password must be at least 8 characters , letters and digits'"
      )
      .required("New Password is Required"),
  });

  const changePasswordForm = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
    },
    validationSchema,
    onSubmit: callChangePassword,
  });

  return (
    <>
      <Helmet>
        <title>Change Password</title>
      </Helmet>
      <div className={`${styles.header_login} py-5 mb-5 text-center `}>
        <h1>Change Password</h1>

        <Link to="/profile" className="text-decoration-none ">
          <span className={`${styles.link_home} pe-1 `}>Profile</span>
        </Link>

        <span className={`${styles.span_login}`}>/ Change Password</span>
      </div>
      <div className="container my-5 py-5">
        <div className="row gy-5">
          <div className={`col-md-6 ${styles.form_login}`}>
            <h2>Change Password</h2>
            {error ? <div className="alert alert-danger"> {error}</div> : ""}
            <form onSubmit={changePasswordForm.handleSubmit}>
              <div className="form-group my-3">
                <input
                  type="password"
                  className="w-100"
                  id="old_password"
                  value={changePasswordForm.values.old_password}
                  name="old_password"
                  placeholder="Enter The Old Password"
                  onChange={changePasswordForm.handleChange}
                  onBlur={changePasswordForm.handleBlur}
                />
                {changePasswordForm.errors.old_password &&
                changePasswordForm.touched.old_password ? (
                  <div className="text-danger fs-5 mt-3">
                    {changePasswordForm.errors.old_password}
                  </div>
                ) : null}
              </div>
              <div className="form-group my-3">
                <input
                  type="password"
                  className="w-100 "
                  id="new_password"
                  value={changePasswordForm.values.new_password}
                  name="new_password"
                  placeholder="Enter The New Password"
                  onChange={changePasswordForm.handleChange}
                  onBlur={changePasswordForm.handleBlur}
                />
                {changePasswordForm.errors.new_password &&
                changePasswordForm.touched.new_password ? (
                  <div className="text-danger fs-5 mt-3">
                    {changePasswordForm.errors.new_password}
                  </div>
                ) : null}
              </div>

              <div className={`d-flex justify-content-between my-3`}>
                {isLoading ? (
                  <button type="submit" className={`${styles.login_button}`}>
                    <i className="fa fa-spinner fa-spin"></i>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={`${styles.login_button}`}
                    disabled={
                      !(changePasswordForm.isValid && changePasswordForm.dirty)
                    }
                  >
                    Change Password
                  </button>
                )}
              </div>
            </form>
          </div>
          <div
            className={`col-md-5 ${styles.new_account} offset-md-1   d-flex align-items-center`}
          >
            <div className="d-flex flex-column ">
              <h3>NOT Want The Change Password?</h3>
              <p>
                Welcome Back Profile to access your personalized experience
                ,saved perefernces , and more we 're thrilled to have you with
                us again
              </p>
              <Link to="/profile" className="text-decoration-none">
                <span className={`${styles.register_button}`}>
                  Profile
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
