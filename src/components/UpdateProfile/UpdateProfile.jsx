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
    // const userId = jwtDecode(userToken).id;
    setError("");
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", values.image);
      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
      formData.append("phone", values.phone);
      formData.append("address", values.address);

      const response = await axios.put(
        `http://localhost:8000/api/profile/`,
        formData,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `Token ${localStorage.getItem("userToken")}`
          },
        }
      );
      console.log(response);

      if (response.data.message === "Data Updated Successfully") {
        navigate("/updateProfile");
        setUserData(response.data.user);
        localStorage.setItem("userData", JSON.stringify(response.data.user));

        // if (response.data.user.imageUrl) {
        //   // localStorage.setItem("imageUrl", response.data.user.imageUrl);

        // }      } else {
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
  });

  const updateProfile = useFormik({
    initialValues: {
      first_name: userData.first_name,
      last_name: userData.last_name,
      phone: userData.phone,
      image: "",
      imageUrl: localStorage.getItem("imageUrl") || "", 
      address: userData.address,
    },
    validationSchema,
    onSubmit: (values) => callUpdateProfile(values),
  });
  // useEffect(() => {
  //   if (userData.imageUrl) {
  //     localStorage.setItem("imageUrl", userData.imageUrl); // Save imageUrl in localStorage
  // }, [userData.imageUrl]);
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
            <form
              onSubmit={updateProfile.handleSubmit}
              encType="multipart/form-data"
            >
              <div className="row gy-4">
                <div className="col-md-12 text-center mb-3">
                  <div className="form-group">
                    {/* <img
                      src={updateProfile.values.image && URL.createObjectURL(updateProfile.values.image)}
                      style={{ height: "100px", width: "100px" }}
                      alt="profile img"
                    /> */}
                    <img
                      src={
                        updateProfile.values.image
                          ? URL.createObjectURL(updateProfile.values.image)
                          : updateProfile.values.imageUrl
                      }
                      style={{ height: "100px", width: "100px" }}
                      alt="profile img"
                    />
                    <input
                      type="file"
                      className="w-100"
                      id="image"
                      name="image"
                      onChange={(event) => {
                        updateProfile.setFieldValue(
                          "image",
                          event.currentTarget.files[0]
                        );
                      }}
                      onBlur={updateProfile.handleBlur}
                    />
                    {updateProfile.errors.image &&
                    updateProfile.touched.image ? (
                      <div className="text-danger fs-5 mt-3">
                        {updateProfile.errors.image}
                      </div>
                    ) : null}
                  </div>
                </div>
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
              </div>

              <div className={`d-flex justify-content-between my-3`}>
                {isLoading ? (
                  <button type="submit" className={`${styles.update_button}`}>
                    <i className="fa fa-spinner fa-spin"></i>
                  </button>
                ) : (
                  <button type="submit" className={`${styles.update_button}`}>
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
