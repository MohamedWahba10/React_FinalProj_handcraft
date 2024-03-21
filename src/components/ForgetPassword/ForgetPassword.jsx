import React, { useContext, useState } from "react";
import styles from "./ForgetPassword.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgetPassword() {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  let navigate = useNavigate();
  async function callForgetPassword(reqBody) {
    setError("");
    setisLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/Forgot-Password/`,
        reqBody
      );


        if (response.data.message == "Password reset code sent to your email") {
          navigate("/resetCode");
          toast.success(response.data.message)
          setisLoading(false);
       
        } else {
            setError(response.data.error);

            
          console.log("data", response.data.error);
        }
      
    } catch (error) {
      setError(error.response.data.error);
      setisLoading(false);
      console.error("Error during Forget:", error.response.data.error);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Email Not Valid").required("Email is Required"),
  });

  const ForgetPassword = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: callForgetPassword,
  });

  return (
    <>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <div className={`${styles.header_login} py-5 mb-5 text-center `}>
        <h1>Forget Password</h1>

        <Link to="/login" className="text-decoration-none ">
          <span className={`${styles.link_home} pe-1 `}>Login</span>
        </Link>

        <span className={`${styles.span_login}`}>/ForgetPassword</span>
      </div>
      <div className="container my-5 py-5">
        <div className="row gy-5">
          <div className={`col-md-12 ${styles.form_login}`}>
            {error ? <div className="alert alert-danger"> {error}</div> : ""}
            <form onSubmit={ForgetPassword.handleSubmit}>
              <div className="form-group my-3">
                <input
                  type="email"
                  className="w-100"
                  id="email"
                  value={ForgetPassword.values.email}
                  name="email"
                  placeholder="Enter The Email"
                  onChange={ForgetPassword.handleChange}
                  onBlur={ForgetPassword.handleBlur}
                />
                {ForgetPassword.errors.email && ForgetPassword.touched.email ? (
                  <div className="text-danger fs-5 mt-3">
                    {ForgetPassword.errors.email}
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
                      disabled={!(ForgetPassword.isValid && ForgetPassword.dirty)}
                    >
                      Forget Password
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
