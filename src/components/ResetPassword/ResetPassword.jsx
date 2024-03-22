import React, { useContext, useState } from "react";
import styles from "./ResetPassword.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  let navigate = useNavigate();
  async function callResetPassword(reqBody) {
    setError("");
    setisLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8000/api/password-reset/`,
        reqBody
      );

      if (response.data.message) {
        navigate("/");
        toast.success(response.data.message);
        setisLoading(false);
      } else {
        setError(response.data.error);

        console.log("data", response.data.error);
      }
    } catch (error) {
      setError(error.response.data.error);
      setisLoading(false);
      //   console.error("Error during Forget:", error.response.data.error);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Email Not Valid").required("Email is Required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "'Password must be at least 8 characters , letters and digits'"
      )
      .required("Password is Required"),
  });

  const ResetPassword = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: callResetPassword,
  });

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <div className={`${styles.header_login} py-5 mb-5 text-center `}>
        <h1>Reset Password</h1>

        <Link to="/login" className="text-decoration-none ">
          <span className={`${styles.link_home} pe-1 `}>Login</span>
        </Link>

        <span className={`${styles.span_login}`}>/ ResetPasseword</span>
      </div>
      <div className="container my-5 py-5">
        <div className="row gy-5">
          <div className={`col-md-12 ${styles.form_login}`}>
            {error ? <div className="alert alert-danger"> {error}</div> : ""}
            <form onSubmit={ResetPassword.handleSubmit}>
            <div className="form-group my-3">
                <input
                  type="email"
                  className="w-100"
                  id="email"
                  value={ResetPassword.values.email}
                  name="email"
                  placeholder="Enter The Email"
                  onChange={ResetPassword.handleChange}
                  onBlur={ResetPassword.handleBlur}
                />
                {ResetPassword.errors.email && ResetPassword.touched.email ? (
                  <div className="text-danger fs-5 mt-3">
                    {ResetPassword.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="form-group my-3">
                <input
                  type="password"
                  className="w-100 "
                  id="newPassword"
                  value={ResetPassword.values.newPassword}
                  name="newPassword"
                  placeholder="Enter The New Password"
                  onChange={ResetPassword.handleChange}
                  onBlur={ResetPassword.handleBlur}
                />
                {ResetPassword.errors.newPassword && ResetPassword.touched.newPassword ? (
                  <div className="text-danger fs-5 mt-3">
                    {ResetPassword.errors.newPassword}
                  </div>
                ) : null}
              </div>

              <div className={`d-flex justify-content-between my-3`}>
                <div>
                  {isLoading ? (
                    <button type="submit" className={`${styles.login_button}`}>
                      <i className="fa fa-spinner fa-spin"></i>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className={`${styles.login_button}`}
                      disabled={!(ResetPassword.isValid && ResetPassword.dirty)}
                    >
                     Reset Password
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
