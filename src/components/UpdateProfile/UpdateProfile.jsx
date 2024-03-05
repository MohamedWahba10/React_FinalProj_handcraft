import React, { useContext, useEffect, useState } from "react";
import styles from "./UpdateProfile.module.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import { TokenContext } from "../../Context/Token";

export default function UpdateProfile() {
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let { setToken, setUserData, userData } = useContext(TokenContext);
  const userToken = localStorage.getItem("userToken");
  var userDataString = localStorage.getItem("userData");
  userData = JSON.parse(userDataString);

  async function callUpdateProfile(values) {
    console.log("values", values);
    const userId = jwtDecode(userToken).id;
    setError("");
    console.log("Merrrrrrna");
    setIsLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8000/api/${userId}/`,
        values
      );
      console.log(response);

      if (response.data.message === "Data Updated Successfully") {
        navigate("/");
        setUserData(response.data.user);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
      } else {
        console.log("data", response.data.message);
      }
    } catch (error) {
      setError(error.response.data.detail);
      setIsLoading(false);
      console.error("Error during Update:", error.response.data.detail);
    }
  }

  const validationSchema = Yup.object({
    first_name: Yup.string()
      .matches(/^[a-zA-Z]{3,10}$/, "name must be from 3 to 10 letters")
      .required("Required"),
    last_name: Yup.string()
      .matches(/^[a-zA-Z]{3,10}$/, "name must be from 3 to 10 letters")
      .required("Required"),
    phone: Yup.string().matches(/^01[1250][0-9]{8}$/, "invalid"),
    address: Yup.string(),
    ssn: Yup.string().when("usertype", {
      is: "vendor",
      then: () =>
        Yup.string()
          .matches(/^\d{14}$/, "SSN must be a 14-digit number")
          .required("SSN is required"),
      otherwise: () => Yup.string().notRequired(),
    }),
  });

  const updateProfile = useFormik({
    initialValues: {
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      usertype: userData.usertype,
      address: userData.address,
      ssn: userData.ssn,
      shopname: userData.shopname,
      is_superuser: userData.is_superuser,
    },
    validationSchema,
    onSubmit: (values) => callUpdateProfile(values),
  });

  return (
    <>
      <Helmet>
        <title>Update Profile</title>
      </Helmet>
      <div className={`${styles.header_update} py-5 mb-5 text-center `}>
        <h1>Update Profile</h1>

        <Link to="/profile" className="text-decoration-none ">
          <span className={`${styles.link_home} pe-1 `}>Your Profile</span>
        </Link>

        <span className={`${styles.span_update}`}>&gt; Update Profile</span>
      </div>
      <div className="container my-5 py-5">
        <div>
          <div className={`${styles.form_update}`}>
            <h2 className="text-center py-3">Update Profile</h2>
            {error ? <div className="alert alert-danger"> {error}</div> : ""}
            <form onSubmit={updateProfile.handleSubmit}>
              <div className="row gy-4">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="first_name" className="fs-4 fw-bold">
                      First Name
                    </label>

                    <input
                      type="text"
                      className="w-100"
                      id="first_name"
                      value={updateProfile.values.first_name}
                      name="first_name"
                      placeholder="Enter The First Name "
                      onChange={updateProfile.handleChange}
                      onBlur={updateProfile.handleBlur}
                    />
                    {updateProfile.errors.first_name &&
                    updateProfile.touched.first_name ? (
                      <div className="text-danger fs-5 mt-3">
                        {updateProfile.errors.first_name}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="last_name" className="fs-4 fw-bold">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-100 "
                      id="last_name"
                      value={updateProfile.values.last_name}
                      name="last_name"
                      placeholder="Enter The Last Name"
                      onChange={updateProfile.handleChange}
                      onBlur={updateProfile.handleBlur}
                    />
                    {updateProfile.errors.last_name &&
                    updateProfile.touched.last_name ? (
                      <div className="text-danger fs-5 mt-3">
                        {updateProfile.errors.last_name}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="phone" className="fs-4 fw-bold">
                      Phone
                    </label>

                    <input
                      type="text"
                      className="w-100"
                      id="phone"
                      value={updateProfile.values.phone}
                      name="phone"
                      placeholder="Enter The Phone "
                      onChange={updateProfile.handleChange}
                      onBlur={updateProfile.handleBlur}
                    />
                    {updateProfile.errors.phone &&
                    updateProfile.touched.phone ? (
                      <div className="text-danger fs-5 mt-3">
                        {updateProfile.errors.phone}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="address" className="fs-4 fw-bold">
                      Address
                    </label>

                    <input
                      type="text"
                      className="w-100"
                      id="address"
                      value={updateProfile.values.address}
                      name="address"
                      placeholder="Enter The Address "
                      onChange={updateProfile.handleChange}
                      onBlur={updateProfile.handleBlur}
                    />
                    {updateProfile.errors.address &&
                    updateProfile.touched.address ? (
                      <div className="text-danger fs-5 mt-3">
                        {updateProfile.errors.address}
                      </div>
                    ) : null}
                  </div>
                </div>
                {userData.usertype === "customer" ? null : (
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="ssn" className="fs-4 fw-bold">
                        SSN
                      </label>

                      <input
                        type="text"
                        className="w-100"
                        id="ssn"
                        value={updateProfile.values.ssn}
                        name="ssn"
                        placeholder="Enter The SSN "
                        onChange={updateProfile.handleChange}
                        onBlur={updateProfile.handleBlur}
                      />
                      {updateProfile.errors.ssn && updateProfile.touched.ssn ? (
                        <div className="text-danger fs-5 mt-3">
                          {updateProfile.errors.ssn}
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>

              <div className={`d-flex justify-content-between my-3`}>
                {isLoading ? (
                  <button type="submit" className={`${styles.update_button}`}>
                    <i className="fa fa-spinner fa-spin"></i>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={`${styles.update_button}`}
                    disabled={!(updateProfile.isValid && updateProfile.dirty)}
                  >
                    Save Change
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
