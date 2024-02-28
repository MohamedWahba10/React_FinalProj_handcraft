import React from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import axios from "axios";

export default function Login() {
  let navigate = useNavigate();
  async function callLogin(reqBody) {
    try {
      let { data } = await axios
        .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, reqBody)
        .catch((err) => {
          console.log("error");
        });

      if (data.message === "success") {
        navigate("/");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Email Not Valid").required("Email is Required"),
    password: Yup.string()
      .min(6, "Password must be at least 8 characters")
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

        <Link to="/" className="text-decoration-none ">
          <span className={`${styles.link_home} pe-1 `}>HomePage</span>
        </Link>

        <span className={`${styles.span_login}`}>&gt; Login</span>
      </div>
      <div className="container my-5 py-5">
        <div className="row gy-5">
          <div className={`col-md-6 ${styles.form_login}`}>
            <h2>Login</h2>
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
                <button
                  type="submit"
                  className={`${styles.login_button}`}
                  disabled={!(loginForm.isValid && loginForm.dirty)}
                >
                  LOGIN
                </button>
              </div>
            </form>
          </div>
          <div className={`col-md-5 ${styles.new_account} offset-md-1   d-flex align-items-center`}>
            <div className="d-flex flex-column ">
              <h3>Join us</h3>
              <p>
                Be part of our growing family of new customers! Join us today
                and unlock a worldof exclusive benefits, offers, and
                personalized experiences.
              </p>
              <Link to="/register" className="text-decoration-none">
                
                <span className={`${styles.register_button}`} >
                REGISTER
                </span>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
