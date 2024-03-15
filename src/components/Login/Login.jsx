import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import axios from "axios";
import { TokenContext } from "../../Context/Token";
import Cookies from "js-cookie";

export default function Login() {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  let navigate = useNavigate();
  let { setToken, setUserData } = useContext(TokenContext);
  async function callLogin(reqBody) {
    setError("");
    setisLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/login/`,
        reqBody
      );

      if (response.status === 200) {
        const token = response.data.token;

        if (response.data.message == "success" && token && token.length > 0) {
          navigate("/");
          setisLoading(false);
          localStorage.setItem("userToken", token);
          setToken(token);
        } else {
          console.log("data", response.data.message);
        }
      } else {
        console.log("Unexpected response status:", response.status);
      }
    } catch (error) {
      setError(error.response.data.detail);
      setisLoading(false);
      console.error("Error during login:", error.response.data.detail);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Email Not Valid").required("Email is Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "'Password must be at least 8 characters , letters and digits'"
      )
      .required("Password is Required"),
  });

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: callLogin,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className={`${styles.header_login} py-5 mb-5 text-center `}>
        <h1>Login</h1>

        <Link to="/register" className="text-decoration-none ">
          <span className={`${styles.link_home} pe-1 `}>Register</span>
        </Link>

        <span className={`${styles.span_login}`}>&gt; Login</span>
      </div>
      <div className="container my-5 py-5">
        <div className="row gy-5">
          <div className={`col-md-6 ${styles.form_login}`}>
            <h2>Login</h2>
            {error ? <div className="alert alert-danger"> {error}</div> : ""}
            <form onSubmit={loginForm.handleSubmit}>
              <div className="form-group my-3">
                <input
                  type="email"
                  className="w-100"
                  id="email"
                  value={loginForm.values.email}
                  name="email"
                  placeholder="Enter The Email"
                  onChange={loginForm.handleChange}
                  onBlur={loginForm.handleBlur}
                />
                {loginForm.errors.email && loginForm.touched.email ? (
                  <div className="text-danger fs-5 mt-3">
                    {loginForm.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="form-group my-3">
                <input
                  type="password"
                  className="w-100 "
                  id="password"
                  value={loginForm.values.password}
                  name="password"
                  placeholder="Enter The Password"
                  onChange={loginForm.handleChange}
                  onBlur={loginForm.handleBlur}
                />
                {loginForm.errors.password && loginForm.touched.password ? (
                  <div className="text-danger fs-5 mt-3">
                    {loginForm.errors.password}
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
                      // disabled={!(loginForm.isValid && loginForm.dirty)}
                    >
                      LOGIN
                    </button>
                  )}
                </div>
                <div>
                  <Link to="/forgetPassword">
                  <button
                      type="button"
                      className={`${styles.login_button}`}
                      // disabled={!(loginForm.isValid && loginForm.dirty)}
                    >
                      Forget Password
                    </button>
                  </Link>
                </div>
               
              </div>
            </form>
          </div>
          <div
            className={`col-md-5 ${styles.new_account} offset-md-1   d-flex align-items-center`}
          >
            <div className="d-flex flex-column ">
              <h3>Join us</h3>
              <p>
                Be part of our growing family of new customers! Join us today
                and unlock a worldof exclusive benefits, offers, and
                personalized experiences.
              </p>
              <Link to="/register" className="text-decoration-none">
                <span className={`${styles.register_button}`}>REGISTER</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
