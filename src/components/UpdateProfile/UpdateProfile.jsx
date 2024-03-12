import React, { useContext, useEffect, useState } from "react";
import styles from "./UpdateProfile.module.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import Loading from "../Loading/Loading";
import toast from "react-hot-toast";
import { Modal, Button } from "react-bootstrap";

export default function UpdateProfile() {
  let navigate = useNavigate();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [data, setData] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  async function ProfileData() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/profile/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("userToken")}`,
        },
      });
      console.log("response", response);
      setData(response);
    } catch (error) {
      console.error("Failed to fetch profile data", error);
    }
  }

  async function ProfileDelete() {
    setIsLoadingDelete(true);

    try {

      const response = await axios.delete(
        "http://127.0.0.1:8000/api/profile/",
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("userToken")}`,
          },
        }
      );

        localStorage.removeItem("userToken");
        navigate("/login");
        setIsLoadingDelete(false);
        toast.success("Account Removed Successfully");
    } catch (error) {
      console.error("Failed to fetch profile data", error);
      setIsLoadingDelete(false);

    }
  }

  useEffect(() => {
    ProfileData();
  }, []);

  let userData = data?.data?.message;

  async function callUpdateProfile(values) {
    setError("");
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
      formData.append("phone", values.phone);
      formData.append("address", values.address);
      if (values.image && values.image instanceof File) {
        formData.append("image", values.image);
      } else if (!values.image && userData && userData.image) {
        formData.append("image", userData.image);
      }

      const response = await axios.put(
        `http://localhost:8000/api/profile/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${localStorage.getItem("userToken")}`,
          },
        }
      );
      if (response.data.message === "Data Updated Successfully") {
        setIsLoading(false);
        toast.success("Product Update successfully");

        navigate("/profile");
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
  let updateProfile = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone: "",
      image: "",
      imageUrl: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values) => callUpdateProfile(values),
  });
  useEffect(() => {
    if (userData) {
      updateProfile.setValues({
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        phone: userData.phone || "",
        image: userData.image || "",
        imageUrl: userData.imageUrl || "",
        address: userData.address || "",
      });
    }
  }, [userData]);


  const handleConfirmDelete = () => {
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };
  return (
    <>
      <Helmet>
        <title>Update Profile</title>
      </Helmet>
      {data?.data?.message ? (
        <>
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
                {error ? (
                  <div className="alert alert-danger"> {error}</div>
                ) : (
                  ""
                )}
                <form
                  onSubmit={updateProfile.handleSubmit}
                  encType="multipart/form-data"
                >
                  <div className="row gy-4">
                    <div className="col-md-12 text-center mb-3">
                      <div className="form-group">
                        <img
                          src={userData.imageUrl}
                          style={{ height: "150px", width: "150px" }}
                          alt="profile img"
                        />
                        <br />
                        <br />
                        <input
                          type="file"
                          className="w-100  border"
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
                      <button
                        type="submit"
                        className={`${styles.update_button}`}
                      >
                        <i className="fa fa-spinner fa-spin"></i>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className={`${styles.update_button}`}
                      >
                        Save Change
                      </button>
                    )}
                  </div>
                </form>
                <div className={`d-flex justify-content-between my-3`}>
                  {isLoadingDelete ? (
                    <button type="submit" className={`${styles.update_button}`} disabled >
                      <i className="fa fa-spinner fa-spin"></i>
                    </button>
                  ) : (
                    <>
                    <button
                      type="button"
                      onClick={handleConfirmDelete}
                      className={`${styles.update_button}`}
                    >
                      Delete Account
                    </button>
                     <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
                     <Modal.Header closeButton>
                       <Modal.Title>Confirm Deletion</Modal.Title>
                     </Modal.Header>
                     <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
                     <Modal.Footer>
                       <Button variant="secondary" onClick={handleCloseConfirmModal}>
                         Cancel
                       </Button>
                       <Button variant="danger" onClick={ProfileDelete}>
                         Delete
                       </Button>
                     </Modal.Footer>
                   </Modal>
                   </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
