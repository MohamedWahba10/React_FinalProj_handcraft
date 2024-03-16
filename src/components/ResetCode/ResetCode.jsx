import React, { useContext, useState } from "react";
import styles from "./ResetCode.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetCode() {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  let navigate = useNavigate();
  async function callResetPassword(reqBody) {
    setError("");
    setisLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/verifyResetCode/`,
        reqBody
      );

      if (
        response.data.message == "Code verified successfully!"
      ) {
        navigate("/resetPassword");
        toast.success(response.data.message);
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
    resetCode: Yup.string().required("Reset Code is Required"),
  });

  const ResetPassword = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: callResetPassword,
  });

  return (
    <>
      <Helmet>
        <title>Reset Code</title>
      </Helmet>
      <div className={`${styles.header_login} py-5 mb-5 text-center `}>
        <h1>Reset Code</h1>

        <Link to="/login" className="text-decoration-none ">
          <span className={`${styles.link_home} pe-1 `}>Login</span>
        </Link>

        <span className={`${styles.span_login}`}>&gt; ResetCode</span>
      </div>
      <div className="container my-5 py-5">
        <div className="row gy-5">
          <div className={`col-md-12 ${styles.form_login}`}>
            <h2 className="text-center">Reset Code</h2>
            {error ? <div className="alert alert-danger"> {error}</div> : ""}
            <form onSubmit={ResetPassword.handleSubmit}>
              <div className="form-group my-3">
                <input
                  type="number"
                  className="w-100"
                  id="resetCode"
                  value={ResetPassword.values.resetCode}
                  name="resetCode"
                  placeholder="Enter The Reset Code"
                  onChange={ResetPassword.handleChange}
                  onBlur={ResetPassword.handleBlur}
                />
                {ResetPassword.errors.resetCode &&
                ResetPassword.touched.resetCode ? (
                  <div className="text-danger fs-5 mt-3">
                    {ResetPassword.errors.resetCode}
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
                      Send Reset Code
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
